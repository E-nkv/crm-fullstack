export function validatePartialContact(contact: { firstName?: string; lastName?: string; email?: string; phone?: string; company?: string; position?: string; status?: string; }): string[] {
    const errors: string[] = [];
    if (contact.firstName !== undefined) {
      const error = validateFirstName(contact.firstName);
      if (error) errors.push(error);
    }
    if (contact.lastName !== undefined) {
      const error = validateLastName(contact.lastName);
      if (error) errors.push(error);
    }
    if (contact.email !== undefined) {
      const error = validateEmail(contact.email);
      if (error) errors.push(error);
    }
    if (contact.phone !== undefined) {
      const error = validatePhone(contact.phone);
      if (error) errors.push(error);
    }
    if (contact.status !== undefined) {
      const error = validateStatus(contact.status);
      if (error) errors.push(error);
    }
    return errors;
}
  
function validateFirstName(name: string): string | null {
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(name)) {
      return 'First name can only contain letters';
    }
    return null;
}
  
function validateLastName(name: string): string | null {
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(name)) {
      return 'Last name can only contain letters';
    }
    return null;
}
  
function validateEmail(email: string): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format';
    }
    return null;
}
  
function validatePhone(phone: string): string | null {
    const phoneRegex = /^\+?[0-9]*$/;
    if (!phoneRegex.test(phone)) {
      return 'Phone number can only contain numbers and an optional leading plus sign';
    }
    return null;
}
  
function validateStatus(status: string): string | null {
    const validStatuses = ['New', 'Contacted', 'Qualified', 'Lost'];
    if (!validStatuses.includes(status)) {
      return `Status must be one of ${validStatuses.join(', ')}`;
    }
    return null;
}
  
