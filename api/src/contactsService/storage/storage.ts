import { Contact } from "../service/contact.entity";
import { Filters } from "../service/contacts";

export interface Store {
  getContacts(
    filters: Filters,
    pagination: { limit: number; offset: number },
  ): Promise<[Contact[], number]>;
  createContact(contact: Contact): Promise<Contact>;
  updateContact(id: number, contact: Contact): Promise<Contact>;
  getContact(id: number): Promise<Contact>;
}

