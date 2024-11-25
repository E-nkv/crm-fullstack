import { Contact } from "../../App"
import { Response } from "../RequestStatus/RequestStatus.component"
import { ContactFormErrors } from "../../App"
import * as Dialog from '@radix-ui/react-dialog'
import { FaEdit } from "react-icons/fa"
import * as Form from '@radix-ui/react-form'
import RequestStatus from "../RequestStatus/RequestStatus.component"
import { Cross1Icon } from "@radix-ui/react-icons"
interface BtnProps {
    contact : Contact,
    formErrors: Record<string, string>,
    onInputChange: (e : any) => void,
    isLoading: boolean,
    response : Response | null
    handleSubmit : () => void  
    updateFormContact : Contact
    setUpdateFormContact : React.Dispatch<React.SetStateAction<Contact>>
    setFormErrorsUpdateContact : React.Dispatch<React.SetStateAction<ContactFormErrors>>
   
}
const Btn : React.FC <BtnProps>= ({contact, formErrors, onInputChange, isLoading, response, handleSubmit, updateFormContact, setUpdateFormContact, setFormErrorsUpdateContact}) => {
    const handleOpenChangeUpdateForm = (open: boolean) => { 
        if (open) {        
            setUpdateFormContact(contact); 
            setFormErrorsUpdateContact({
                firstName:'', lastName:'', email:'', phone:'', company:'', position:''
            })
        }
    }
    return <>
        <Dialog.Root onOpenChange={handleOpenChangeUpdateForm}>
            <Dialog.Trigger>
                <FaEdit/>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0 bg-black/50 w-full '>
                    <Dialog.Content aria-describedby = "UPDATE CONTACT FORM" className='fixed left-1/2 top-1/2 w-full max-w-md bg-blue-50 p-8 -translate-x-1/2 -translate-y-1/2 rounded-md text-gray-900 shadow'>
                    <div className='flex items-start justify-between'>
                        <Dialog.Title className='mb-7 font-sans text-2xl '>Update Contact</Dialog.Title>
                        <Dialog.Description aria-describedby='Form to update a contact'></Dialog.Description>
                        <Dialog.Close className='text-gray-400 hover:text-gray-500'>
                            <Cross1Icon />
                        </Dialog.Close>
                    </div>
                        <Form.Root className="space-y-1 w-full mb-2">
                            <Form.Field name="firstName">
                                <Form.Label className="text-sm font-medium text-gray-900">First Name</Form.Label>
                                <div className="grid grid-cols-[1.5fr_0.5fr] gap-4 items-center">
                                <Form.Control asChild>
                                    <input
                                    className="p-1 border rounded text-xm block w-full"
                                    type="text"
                                    name="firstName"
                                    maxLength={17}
                                    value={updateFormContact.firstName}
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
                                    
                                    value={updateFormContact.lastName}
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
                                    maxLength={25}
                                    className="p-1 border rounded text-xm block w-full"
                                    type="text"
                                    name="email"
                                    
                                    value={updateFormContact.email}
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
                                    maxLength={20}
                                    className="p-1 border rounded text-xm block w-full"
                                    type="text"
                                    name="company"
                                    
                                    value={updateFormContact.company}
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
                                    maxLength={18}
                                    className="p-1 border rounded text-xm block w-full"
                                    type="text"
                                    name="phone"
                                    
                                    value={updateFormContact.phone}
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
                                    maxLength={20}
                                    value={updateFormContact.position}
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
                                    value={updateFormContact.status}
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
                        <RequestStatus isLoading={isLoading} response={response} isLoadingMsg={'Updating contact...'}/>
                        <div className='mt-8 space-x-6 text-right'>
                            <Dialog.Close className='rounded px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-600'>
                            Cancel
                            </Dialog.Close>
                            <button 
                            className='rounded px-4 py-2 bg-green-500 text-sm font-medium text-white hover:bg-green-600'
                            onClick={handleSubmit}>
                            Update
                            </button>
                        </div>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    </>
}

export default Btn