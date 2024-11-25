import { Store } from './storage';
import { DataSource, DataSourceOptions, Repository } from 'typeorm';
import { Contact } from '../service/contact.entity';
//import * as dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import {Filters} from './../service/contacts'

//stuck here :(
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
    const dbConf: DataSourceOptions = {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'crm',
      entities: [Contact],
      synchronize: true,
    };

    this.dataSource = new DataSource(dbConf);
    console.log(dbConf);

    await this.dataSource.initialize();
    this.contactRepo = this.dataSource.getRepository(Contact);
  }

  async getContacts(
    filters: Filters,
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
    const res = await queryBuilder.getMany()
    return new Promise<[Contact[], number]>(()=>{return [res, 100]})  //for the linter to not complain
  }

  async createContact(contact: Contact) {
    const newContact = this.contactRepo.create(contact);
    const savedContact = await this.contactRepo.save({
      ...newContact,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return savedContact;
  }

  async updateContact(id: number, contact: Contact) {
    contact.updatedAt = new Date();
    await this.contactRepo.update(id, contact);
    return await this.contactRepo.findOne({ where: { id } });
  }

  async getContact(id: number) {
    return await this.contactRepo.findOne({ where: { id } });
  }
}

export default MySqlStore;
