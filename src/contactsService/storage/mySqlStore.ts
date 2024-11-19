import { Store } from './storage';
import { DataSource, Repository } from 'typeorm';
import { Contact } from '../service/contact.entity';
import * as dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

dotenv.config();
class MySqlStore implements Store {
  private dataSource: DataSource;
  private contactRepo: Repository<Contact>;

  constructor() {
    this.init()
      .then(() => {
        this.seedDb();
        console.log('started db conn');
      })
      .catch((error) => {
        console.error('err during initing data src', error);
      });
  }
  async seedDb() {
    const count = await this.contactRepo.count();

    if (count === 0) {
      for (let i = 0; i < 100; i++) {
        const contact = new Contact();
        contact.firstName = faker.person.firstName();
        contact.lastName = faker.person.lastName();
        contact.email = faker.internet.email();
        contact.phone = faker.phone.number();
        contact.company = faker.company.name();
        contact.position = faker.helpers.arrayElement([
          'Software Engineer',
          'Data Analyst',
          'Project Manager',
          'Designer',
          'Sales Manager',
        ]);
        contact.status = faker.helpers.arrayElement([
          'New',
          'Contacted',
          'Qualified',
          'Lost',
        ]);
        contact.createdAt = new Date();
        contact.updatedAt = new Date();

        try {
          await this.contactRepo.save(contact);
        } catch (err) {
          console.log(`Couldn't save contact ${contact}. Error: ${err}`);
        }
      }
      console.log('Database seeded with 100 contacts');
    }
  }

  async init() {
    this.dataSource = new DataSource({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'crm',
      entities: [Contact],
      synchronize: true,
    });

    await this.dataSource.initialize();
    this.contactRepo = this.dataSource.getRepository(Contact);
  }

  async getContacts(
    filters: any,
    pagination: { limit: number; offset: number },
  ) {
    const queryBuilder = this.contactRepo.createQueryBuilder('contact');

    if (filters.firstName) {
      queryBuilder.andWhere('contact.firstName LIKE :firstName', {
        firstName: `%${filters.firstName}%`,
      });
    }
    if (filters.lastName) {
      queryBuilder.andWhere('contact.lastName LIKE :lastName', {
        lastName: `%${filters.lastName}%`,
      });
    }
    if (filters.email) {
      queryBuilder.andWhere('contact.email LIKE :email', {
        email: `%${filters.email}%`,
      });
    }
    if (filters.company) {
      queryBuilder.andWhere('contact.company LIKE :company', {
        company: `%${filters.company}%`,
      });
    }
    if (filters.position) {
      queryBuilder.andWhere('contact.position LIKE :position', {
        position: `%${filters.position}%`,
      });
    }
    if (filters.status) {
      queryBuilder.andWhere('contact.status = :status', {
        status: filters.status,
      });
    }

    queryBuilder.skip(pagination.offset).take(pagination.limit);

    return await queryBuilder.getMany();
  }

  async createContact(contact: any) {
    const newContact = this.contactRepo.create(contact);
    const savedContact = await this.contactRepo.save({
      ...newContact,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return savedContact;
  }

  async updateContact(id: number, contact: any) {
    contact.updatedAt = new Date();
    await this.contactRepo.update(id, contact);
    return await this.contactRepo.findOne({ where: { id } });
  }

  async getContact(id: number) {
    return await this.contactRepo.findOne({ where: { id } });
  }
}

export default MySqlStore;
