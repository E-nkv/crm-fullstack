import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import ContactFields from '../ContactFields/ContactFields.component';
import RequestStatus, { Response } from '../RequestStatus/RequestStatus.component';

interface CreateContactDialogProps {
  contact: any;
  formErrors: any;
  onInputChange: any;
  formRef: React.RefObject<HTMLFormElement>;
  isLoading: boolean;
  response: Response | null;
  handleSubmit: () => void;
}

const ContactDialog: React.FC<CreateContactDialogProps> = ({
  contact,
  formErrors,
  onInputChange,
  formRef,
  isLoading,
  response,
  handleSubmit,
}) => (
  <Dialog.Root>
    <Dialog.Trigger className="bg-blue-500 text-white hover:bg-blue-200 rounded px-4 py-2">
      Create Contact
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className='fixed inset-0 bg-black/50 w-full'>
        <Dialog.Content className='fixed left-1/2 top-1/2 w-full max-w-md bg-blue-50 p-8 -translate-x-1/2 -translate-y-1/2 rounded-md text-gray-900 shadow'>
          <div className='flex items-start justify-between'>
            <Dialog.Title className='mb-7 font-sans text-2xl'>Create Contact</Dialog.Title>
            <Dialog.Description aria-describedby='Form to create a contact'></Dialog.Description>
            <Dialog.Close className='text-gray-400 hover:text-gray-500'>
              <Cross1Icon />
            </Dialog.Close>
          </div>
          <ContactFields 
            contact={contact}   
            formErrors={formErrors} 
            onInputChange={onInputChange}
            formRef={formRef}
          />
          <RequestStatus isLoading={isLoading} response={response} isLoadingMsg='Creating contact...' />
          <div className='mt-8 space-x-6 text-right'>
            <Dialog.Close className='rounded px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-600'>
              Cancel
            </Dialog.Close>
            <button 
              className='rounded px-4 py-2 bg-green-500 text-sm font-medium text-white hover:bg-green-600'
              onClick={handleSubmit}>
              Create
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>
);

export default ContactDialog;
