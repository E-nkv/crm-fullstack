export function validatePartialContact(contact: {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  status?: string;
}): string[] {
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
  return nameRegex.test(name.trim()) ? null : 'First name can only contain letters';
}

function validateLastName(name: string): string | null {
  const nameRegex = /^[A-Za-z]+$/;
  return nameRegex.test(name.trim()) ? null : 'Last name can only contain letters';
}

function validateEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim()) ? null : 'Invalid email format';
}

function validatePhone(phone: string): string | null {
  const phoneRegex = /^\+?[0-9]*$/;
  return phoneRegex.test(phone.trim())
    ? null
    : 'Phone number can only contain numbers and an optional leading plus sign';
}

function validateStatus(status: string): string | null {
  const validStatuses = ['New', 'Contacted', 'Qualified', 'Lost'];
  return validStatuses.includes(status.trim())
    ? null
    : `Status must be one of ${validStatuses.join(', ')}`;
}
