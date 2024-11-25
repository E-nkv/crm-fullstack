import React, { useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { FaCheck } from 'react-icons/fa';

import { ContactFormErrors } from '../../App';
import Btn from './../ExternalUpdateBtn/ExternalUpdateBtn.component';
import { Response } from '../RequestStatus/RequestStatus.component';
import { Pencil2Icon } from '@radix-ui/react-icons';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  status: string;
}

interface ContactListProps {
  contacts: Contact[];
  formErrors: any,
  onInputChange: (e : any) => void,
  isLoadingExt: boolean,
  response : Response | null 
  handleSubmit : () => void 
  updateFormContact :  Contact
  setUpdateFormContact: React.Dispatch<React.SetStateAction<Contact>>
  setFormErrorsUpdateContact: React.Dispatch<React.SetStateAction<ContactFormErrors>>
}

const ContactList: React.FC<ContactListProps> = ({ contacts, formErrors, onInputChange, isLoadingExt, response, handleSubmit, updateFormContact, setUpdateFormContact, setFormErrorsUpdateContact}) => {
  //states for inline editing
  const [editableContact, setEditableContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editingContact, setEditingContact] = useState<number | null>(null);

  const handleInlineEdit = (contactId: number) => {
    if (editingContact === contactId) {
      handleBlur();
      setEditingContact(null);
    } else {
      //user clicks on a different inline editing button
      //maybe show a confirmation window to discard current changes / update contact?
      setEditableContact(contacts.find(contact => contact.id === contactId) || null);
      setEditingContact(contactId);
      
    }
  };

  

  const handleInputChange = (field: keyof Contact, value: string) => {
    if (editableContact) {
      setEditableContact({
        ...editableContact,
        [field]: value,
      });
    }
  };

  const handleBlur = async () => {
    //console.log("validate fields and send update req to api")
    console.log(editableContact)
  };

  const renderContact = (contact: Contact) => {
    const isEditing = editingContact === contact.id;
    return (
      <div
        key={contact.id}
        className="grid grid-cols-10 gap-2 bg-white p-1 border-t border-gray-200"
        style={{ gridTemplateColumns: 'repeat(2, 1fr) 1.5fr 1fr 1.2fr 1fr 0.7fr 0.4fr 0.4fr' }}
      >
        {isEditing ? (
          <>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <input
                  value={editableContact?.firstName || ''}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  onBlur={handleBlur}
                  className="text-sm p-1 border rounded"
                />
              </Tooltip.Trigger>
              <Tooltip.Content>First Name</Tooltip.Content>
            </Tooltip.Root>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <input
                  value={editableContact?.lastName || ''}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  onBlur={handleBlur}
                  className="text-sm p-1 border rounded"
                />
              </Tooltip.Trigger>
              <Tooltip.Content>Last Name</Tooltip.Content>
            </Tooltip.Root>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <input
                  value={editableContact?.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={handleBlur}
                  className="text-sm p-1 border rounded"
                />
              </Tooltip.Trigger>
              <Tooltip.Content>Email</Tooltip.Content>
            </Tooltip.Root>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <input
                  value={editableContact?.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  onBlur={handleBlur}
                  className="text-sm p-1 border rounded"
                />
              </Tooltip.Trigger>
              <Tooltip.Content>Phone</Tooltip.Content>
            </Tooltip.Root>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <input
                  value={editableContact?.company || ''}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  onBlur={handleBlur}
                  className="text-sm p-1 border rounded"
                />
              </Tooltip.Trigger>
              <Tooltip.Content>Company</Tooltip.Content>
            </Tooltip.Root>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <input
                  value={editableContact?.position || ''}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  onBlur={handleBlur}
                  className="text-sm p-1 border rounded"
                />
              </Tooltip.Trigger>
              <Tooltip.Content>Position</Tooltip.Content>
            </Tooltip.Root>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <input
                  value={editableContact?.status || ''}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  onBlur={handleBlur}
                  className="text-sm p-1 border rounded"
                />
              </Tooltip.Trigger>
              <Tooltip.Content>Status</Tooltip.Content>
            </Tooltip.Root>
            <button onClick={() => handleInlineEdit(contact.id)} className="text-sm p-1 border rounded w-6">
              <FaCheck />
            </button>
            
          </>
        ) : (
          <>
            <span>{contact.firstName}</span>
            <span>{contact.lastName}</span>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
            <span>{contact.company}</span>
            <span>{contact.position}</span>
            <span>{contact.status}</span>
            <button onClick={() => handleInlineEdit(contact.id)} className="text-sm p-1 border rounded w-6">
              <Pencil2Icon />
            </button>
            <span>
              <Btn
                  contact={contact}
                  formErrors =  {formErrors}
                  onInputChange = {onInputChange}
                  isLoading = {isLoadingExt}
                  response = {response}
                  handleSubmit = {handleSubmit}
                  updateFormContact = {updateFormContact}
                  setUpdateFormContact = {setUpdateFormContact}
                  setFormErrorsUpdateContact = {setFormErrorsUpdateContact}
              />
            </span>
          </>
        )}
      </div>
    );
  };

  return (
    <Tooltip.Provider>
      <div className="w-full max-w-full px-4 my-4">
        <div className="grid w-full grid-cols-10 gap-2 bg-gray-200 p-1 font-bold" style={{ gridTemplateColumns:  'repeat(2, 1fr) 1.5fr 1fr 1.2fr 1fr 0.7fr 0.4fr 0.4fr' }}>
          <span>First Name</span>
          <span>Last Name</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Company</span>
          <span>Position</span>
          <span>Status</span>
          <span></span> {/* Placeholder for edit btn inline (css grid stuff) */}
          <span></span> {/* Placeholder for edit btn external*/}
        </div>
        {contacts.map(renderContact)}
        {isLoading && <div className="loading-spinner">Updating...</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </Tooltip.Provider>
  );
};

export default ContactList;


