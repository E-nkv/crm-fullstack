export interface Store {
    getContacts(filters: any, pagination: { limit: number; offset: number }): Promise<any>;
    createContact(contact: any): Promise<any>;
    updateContact(id: number, contact: any): Promise<any>;
    getContact(id: number): Promise<any>;
}

  