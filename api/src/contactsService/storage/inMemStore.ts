import { Store } from './storage';
import { faker } from '@faker-js/faker';
import { Contact } from '../service/contact.entity';
import { Filters} from '../service/contacts';



export class InMemStore implements Store {
  private contacts: Contact[];

  constructor() {
    this.contacts = [];
    this.seedDb();
  }

  
  private seedDb() {
    const sharedFirstNames = ['John', 'Jane', 'Alex', 'Alice', 'Chris'];
    const sharedLastNames = ['Smith', 'Doe', 'Johnson', 'Brown', 'Davis'];
    const sharedCompanies = ['TechCorp', 'InnovateLtd', 'DevStudio', 'CreativeInc', 'DesignPro'];
    const sharedPositions = [
      'Software Engineer',
      'Data Analyst',
      'Project Manager',
      'Designer',
      'Sales Manager'
    ];
  
    for (let i = 0; i < 148; i++) {
      const firstName = faker.helpers.arrayElement(sharedFirstNames);
      const lastName = faker.helpers.arrayElement(sharedLastNames);
      const company = faker.helpers.arrayElement(sharedCompanies);
      const position = faker.helpers.arrayElement(sharedPositions);
  
      const contact: Contact = {
        id: i + 1,
        firstName: `${firstName}${faker.string.alpha(2)}`,  // Adding random characters to ensure sharing
        lastName: `${lastName}${faker.string.alpha(2)}`,    // Adding random characters to ensure sharing
        email: faker.internet.email(),
        phone: faker.phone.number(),
        company: `${company}${faker.string.alpha(2)}`,      // Adding random characters to ensure sharing
        position :`${position}${faker.string.alpha(2)}`,
        status: faker.helpers.arrayElement(['New', 'Contacted', 'Qualified', 'Lost']),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      this.contacts.push(contact);
    }
  }
  

  async getContacts(
    filters: Filters,
    pagination: { limit: number; offset: number },
  ): Promise<Contact[]> {
    let filteredContacts = this.contacts;

    // Apply filters
    if (filters.firstName) {
      filteredContacts = filteredContacts.filter((contact) =>
        contact.firstName.includes(filters.firstName)
      );
    }
    if (filters.lastName) {
      filteredContacts = filteredContacts.filter((contact) =>
        contact.lastName.includes(filters.lastName)
      );
    }
    if (filters.email) {
      filteredContacts = filteredContacts.filter((contact) =>
        contact.email.includes(filters.email)
      );
    }
    if (filters.company) {
      filteredContacts = filteredContacts.filter((contact) =>
        contact.company.includes(filters.company)
      );
    }
    if (filters.position) {
      filteredContacts = filteredContacts.filter((contact) =>
        contact.position.includes(filters.position)
      );
    }
    if (filters.status) {
      filteredContacts = filteredContacts.filter(
        (contact) => contact.status === filters.status
      );
    }

    // Apply pagination
    const start = pagination.offset;
    const end = start + pagination.limit;

    const res = filteredContacts.slice(start, end);
    console.log(res);
    return res;
  }

  async createContact(contact: Contact): Promise<Contact> {
    const newContact: Contact = {
      ...contact,
      id: this.contacts.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.contacts.push(newContact);
    return newContact;
  }

  async updateContact(id: number, contact: Partial<Contact>): Promise<Contact> {
    const index = this.contacts.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error('Contact not found');
    }

    const updatedContact: Contact = {
      ...this.contacts[index],
      ...contact,
      updatedAt: new Date(),
    };
    this.contacts[index] = updatedContact;
    return updatedContact;
  }

  async getContact(id: number): Promise<Contact> {
    const contact = this.contacts.find((c) => c.id === id);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact
  }
}
