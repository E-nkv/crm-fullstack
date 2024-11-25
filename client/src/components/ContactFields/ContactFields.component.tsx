import React from 'react';
import * as Form from '@radix-ui/react-form';
import { Contact } from './../../App';
import { Response } from '../RequestStatus/RequestStatus.component';
interface ContactFieldsProps {
  contact: Contact;
  formErrors: Record<string, string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  formRef: React.RefObject<HTMLFormElement>;

}

const ContactFields: React.FC<ContactFieldsProps> = ({
  contact,
  formErrors,
  onInputChange,
  formRef,
}) => {
  return (
    <Form.Root ref={formRef}className="space-y-1 w-full mb-4">
      <Form.Field name="firstName">
        <Form.Label className="text-sm font-medium text-gray-900 ">First Name</Form.Label>
        <div className="grid grid-cols-[1.5fr_0.5fr] gap-4 items-center">
          <Form.Control asChild>
            <input
              className="p-1 border rounded text-xm block w-full"
              type="text"
              name="firstName"
              value={contact.firstName}
              onChange={onInputChange}
            />
          </Form.Control>
          {formErrors.firstName && (
            <span className="text-red-500 text-xs  text-center">{formErrors.firstName}</span>
          )}
        </div>
      </Form.Field>
      <Form.Field name="lastName">
        <Form.Label className="text-sm font-medium text-gray-900">Last Name</Form.Label>
        <div className="grid grid-cols-[1.5fr_0.5fr] gap-4 items-center">
          <Form.Control asChild>
            <input
              className="p-1 border rounded text-xm block w-full"
              type="text"
              name="lastName"
              value={contact.lastName}
              onChange={onInputChange}
              
            />
          </Form.Control>
          {formErrors.lastName && (
            <span className="text-red-500 text-xs text-center">{formErrors.lastName}</span>
          )}
        </div>
      </Form.Field>
      <Form.Field name="email">
        <Form.Label className="text-sm font-medium text-gray-900">Email</Form.Label>
        <div className="grid grid-cols-[1.5fr_0.5fr] gap-4 items-center">
          <Form.Control asChild>
            <input
              className="p-1 border rounded text-xm block w-full"
              type="text"
              name="email"
              value={contact.email}
              onChange={onInputChange}
            />
          </Form.Control>
          {formErrors.email && (
            <span className="text-red-500 text-xs  text-center">{formErrors.email}</span>
          )}
        </div>
      </Form.Field>
      <Form.Field name="company">
        <Form.Label className="text-sm font-medium text-gray-900">Company</Form.Label>
        <div className="grid grid-cols-[1.5fr_0.5fr] gap-4 items-center">
          <Form.Control asChild>
            <input
              className="p-1 border rounded text-xm block w-full"
              type="text"
              name="company"
              value={contact.company}
              onChange={onInputChange}
              
            />
          </Form.Control>
          {formErrors.company && (
            <span className="text-red-500 text-xs  text-center">{formErrors.company}</span>
          )}
        </div>
      </Form.Field>
      <Form.Field name="phone">
        <Form.Label className="text-sm font-medium text-gray-900">Phone</Form.Label>
        <div className="grid grid-cols-[1.5fr_0.5fr] gap-4 items-center">
          <Form.Control asChild>
            <input
              className="p-1 border rounded text-xm block w-full"
              type="text"
              name="phone"
              value={contact.phone}
              onChange={onInputChange}
              
            />
          </Form.Control>
          {formErrors.phone && (
            <span className="text-red-500 text-xs text-center">{formErrors.phone}</span>
          )}
        </div>
      </Form.Field>
      <Form.Field name="position">
        <Form.Label className="text-sm font-medium text-gray-900">Position</Form.Label>
        <div className="grid grid-cols-[1.5fr_0.5fr] gap-4 items-center">
          <Form.Control asChild>
            <input
              className="p-1 border rounded text-xm block w-full "
              type="text"
              name="position"
              value={contact.position}
              onChange={onInputChange}
              
            />
          </Form.Control>
          {formErrors.position && (
            <span className="text-red-500 text-xs text-center">{formErrors.position}</span>
          )}
        </div>
      </Form.Field>
      <Form.Field name="status">
        <Form.Label className="text-sm font-medium text-gray-900">Status</Form.Label>
        <div className="flex items-center">
          <Form.Control asChild>
            <select
              className="p-1 border rounded text-xs block w-3/5 "
              name="status"
              value={contact.status}
              onChange={onInputChange}
            >
              <option value="New">New</option>
              <option value="Qualified">Qualified</option>
              <option value="Contacted">Contacted</option>
              <option value="Lost">Lost</option>
            </select>
          </Form.Control>
          
        </div>
      </Form.Field>
    </Form.Root>
  );
};

export default ContactFields;
