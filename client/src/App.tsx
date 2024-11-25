import React, { useState, useEffect, useRef } from 'react';
import ContactFilters, {Filters} from './components/ContactFilters/ContactFilters.component';
import ContactList from './components/ContactList/ContactList.component';
import PaginationControls from './components/PaginationControls/PaginationControls.component';
import ContactDialog from './components/CreateContactDialog/CreateContactDialog';

import {Response} from './components/RequestStatus/RequestStatus.component';
import { FaSearch } from 'react-icons/fa';


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
interface ContactFormErrors { 
  firstName: string; 
  lastName:string; 
  position: string; 
  email: string;
  company: string; 
  phone: string; 
}


const App: React.FC = () => {

  //FILTERS STATES
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filters, setFilters] = useState<Filters>({
    firstName: '',
    lastName: '',
    position: '',
    status: '',
    email: '',
    company: '',
  });
  const prevFiltersRef = useRef<Filters>({
    firstName: '',
    lastName: '',
    position: '',
    status: '',
    email: '',
    company: '',
  })
  //PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(0);
  const totalPagesRef = useRef(0);

  const [error, setError] = useState<string | null>(null);
  const [noContacts, setNoContacts] = useState<boolean>(false);


  //CREATE CONTACT FORM STATES
  const [createFormContact, setCreateFormContact] = useState({
    id : -1,
    firstName: '',
    lastName: '',
    position: '',
    status: 'Any',
    email: '',
    company: '',
    phone: '',
  })
  const [createContactFormErrors, setCreateContactFormErrors] = useState({
    firstName: '',
    lastName: '',
    position: '',
    email: '',
    company: '',
    phone: '',
  })

  const createFormRef = useRef<HTMLFormElement>(null);
  const currTotalErrsCreateContactFormRef = useRef(0);
  const [isLoadingCreateCtctIcon, setisLoadingCreateCtctIcon] = useState(false); 
  const [responseCreateCtcIcon, setResponseCreateCtcIcon] = useState<Response | null>(null);



  //UPDATE CONTACT FORM STATES
  const [updateFormContact, setUpdateFormContact] = useState<Contact>({id:-1, firstName:'', lastName:'', email:'', phone:'', company:'', position:'', status:''}) ;
  const [formErrorsUpdateContact, setFormErrorsUpdateContact] =  useState<ContactFormErrors>({firstName:'', lastName:'', email:'', phone:'', company:'', position:''});
  const currTotalErrsUpdateContactFormRef = useRef(0)
  const [isLoadingUpdateContact, setIsLoadingUpdateContact] = useState(false)
  const [responseUpdateContact, setResponseUpdateContact] = useState<Response | null>(null)  
  


  const handleInputChangeUpdateForm = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setUpdateFormContact((prevContact) => {
      return {...prevContact, [name]: value}
      });
      if (responseUpdateContact!=null) setResponseUpdateContact(null);
    }
    
    
    const handleUpdateContactSubmit = () => {
      validateFormInputsUpdateForm();
      if (currTotalErrsUpdateContactFormRef.current === 0 ) {
          const formData = new FormData(); 
          Object.keys(updateFormContact).forEach(key => {
              const value = updateFormContact[key as keyof Contact]; 
              if (value !== undefined && value !== null) { 
                  formData.append(key, String(value)); 
              } 
          });
        setIsLoadingUpdateContact(true);
        setResponseUpdateContact(null);
        fetch('http://localhost:8080/contacts/'+updateFormContact.id, {
          method: 'PUT',
          body: formData,
        })
          .then((response) => {
            if (response.ok){
              return response.json()
            }
            else {
              setIsLoadingUpdateContact(false);
              setResponseUpdateContact({ok: false, msg:'Error updating contact. Please try again later.'})
            } 
          })
          .then((d) => {
            //contact successfully created. ignore the returned data (the created user in json)
            setIsLoadingUpdateContact(false);
            setResponseUpdateContact({ok:true, msg:'Contact updated successfully'})
            // Reset form values and errs
            setUpdateFormContact( (prevUpdateFormContact) => {
              return {
                id: prevUpdateFormContact.id,
                firstName: '',
                lastName: '',
                position: '',
                status: 'Any',
                email: '',
                company: '',
                phone: '',
              }
            });
            setFormErrorsUpdateContact({
              firstName: '',
              lastName: '',
              position: '',
              email: '',
              company: '',
              phone: '',
            });
            fetchContacts(0);
          })
          .catch((error) => {
              setIsLoadingUpdateContact(false);
              setResponseUpdateContact({ok: false, msg:'Error updating contact. Please try again later.'})
          });
      }
    };
    
    const validateFormInputsUpdateForm = () => {
      validateFormInputs(updateFormContact, setFormErrorsUpdateContact, currTotalErrsUpdateContactFormRef)
    };
  
  //CREATE CONTACT FORM METHODS
  const handleInputChangeCreateForm = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCreateFormContact((prevContact) => {
    return {...prevContact, [name]: value}
    });
    if (responseCreateCtcIcon!=null) setResponseCreateCtcIcon(null);
  }
  
  
  const handleCreateContactSubmit = () => {
    validateFormInputsCreateForm();
    if (currTotalErrsCreateContactFormRef.current === 0) {
      const formData = new FormData(createFormRef.current!);
      setisLoadingCreateCtctIcon(true);
      setResponseCreateCtcIcon(null);
      fetch('http://localhost:8080/contacts', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok){
            return response.json()
          }
          else {
            setisLoadingCreateCtctIcon(false);
            setResponseCreateCtcIcon({ok: false, msg:'Error creating contact. Please try again later.'})
            console.error('Error creating contact:');
          } 
        })
        .then((d) => {
          //contact successfully created. ignore the returned data (created user as json)
          setisLoadingCreateCtctIcon(false);
          setResponseCreateCtcIcon({ok:true, msg:'Contact created successfully'})
          
          // Reset form values and errs
          setCreateFormContact({
            id: -1,
            firstName: '',
            lastName: '',
            position: '',
            status: 'Any',
            email: '',
            company: '',
            phone: '',
          });
          setCreateContactFormErrors({
            firstName: '',
            lastName: '',
            position: '',
            email: '',
            company: '',
            phone: '',
          });
          fetchContacts(0);
        })
        .catch((error) => {
          setisLoadingCreateCtctIcon(false);
          setResponseCreateCtcIcon({ok: false, msg:'Error creating contact. Please try again later.'})
          console.error('Error creating contact:', error);
        });
    }
  };
  
  const validateFormInputsCreateForm = () => {
    validateFormInputs(createFormContact, setCreateContactFormErrors,currTotalErrsCreateContactFormRef )
  };
  const validateFormInputs = (
      formContact : Contact, 
      setFormErrors : React.Dispatch<React.SetStateAction<ContactFormErrors>>, 
      totalsErrsRef : React.MutableRefObject<number> ) => {
        const errors : ContactFormErrors = {
          firstName: '', lastName: '', position: '', email: '', company: '', phone: ''
        };
        let totalsErrs = 0
        // Validate first name
        if (!formContact.firstName.trim()) {
          errors.firstName = 'First name is required.'; totalsErrs++;
          
        } else if (!/^[A-Za-z\s]+$/.test(formContact.firstName)) {
          errors.firstName = 'First name is invalid'; totalsErrs++;
        }
      
        // Validate last name
        if (!formContact.lastName.trim()) {
          errors.lastName = 'Last name is required.'; totalsErrs++;
        } else if (!/^[A-Za-z\s]+$/.test(formContact.lastName)) {
          errors.lastName = 'Last name is invalid'; totalsErrs++;
        }
      
        // Validate email
        if (!formContact.email.trim()) {
          errors.email = 'Email is required.'; totalsErrs++;
        } else if (!/\S+@\S+\.\S+/.test(formContact.email)) {
          errors.email = 'Email is invalid'; totalsErrs++;
        }
      
        // Validate company
        if (!formContact.company.trim()) {
          errors.company = 'Company is required.';totalsErrs++;
        }
      
        // Validate phone
        const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$|^\d{8,15}$/;
        if (!formContact.phone.trim()) {  
          errors.phone = 'Phone number is required.';totalsErrs++;
        } else if (!phoneRegex.test(formContact.phone.trim())) {
            errors.phone = 'Invalid phone.' ;totalsErrs++;
        }
      
        // Validate position
        if (!formContact.position.trim()) {
          errors.position = 'Position is required.';totalsErrs++;
        }
        totalsErrsRef.current = totalsErrs;
        setFormErrors(errors);
    };

  useEffect(() => {
    fetchContacts(0);
  }, []);
  
  

  const fetchContacts = async (offset: number) => {
    
    try {
      const limit = calculateLimit()
      const query = buildFetchQuery(limit, offset, filters);
      const response = await fetch(`http://localhost:8080/contacts?${query}`);
      const data = await response.json();
      setContacts(data.contacts);
      totalPagesRef.current = Math.ceil(data.count / limit);
      
      if (data.contacts.length === 0) {
        setNoContacts(true);
      } else {
        setNoContacts(false);
      }
  
      
    } catch (e) {
      setError('Server is unavailable. Please try again later.');
      setNoContacts(false); // Ensure noContacts is false if there's an error
    }
  };
  
  const handleFilterSubmission = async () => {
    if (!areEqualFilters(prevFiltersRef.current, filters)) await fetchContacts(0);
    prevFiltersRef.current = filters;
  }

  
  useEffect(() => { 
    handleFilterSubmission()
  }, [filters.status]); 

  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      return {...prevFilters, [name]: value}
    });
  };

  const handleStatusChange = (value: string) => {
    setFilters((prevFilters) => {
      return {...prevFilters, status: value}
    });
  };

  //PAGINATION STUFF
  const handleNextPage = () => {
    if (currentPage < totalPagesRef.current - 1) {
      setCurrentPage((prev) => prev + 1);
      fetchContacts((currentPage + 1) * calculateLimit()); // Adjust page size if needed
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      fetchContacts((currentPage - 1) * calculateLimit()); // Adjust page size if needed
    }
  };


  const handleFirstPage = () => {
    setCurrentPage(0);
    fetchContacts(0);
  };

  const handleLastPage = () => {
    const lastPage = totalPagesRef.current - 1;
    setCurrentPage(lastPage);
    fetchContacts(lastPage * calculateLimit()); // Adjust page size if needed
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-2 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.jpeg" alt="logo" className="h-12 mr-1" />
          <h1 className="text-3xl font-bold">Monsoft CRM</h1>
        </div>
        <nav className="flex">
          <a href="#" className="mr-10">About</a>
          <a href="#">Contact Us</a>
        </nav>
      </header>
      <main className="w-full mt-4 flex flex-col items-center">
        <ContactFilters
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleStatusChange={handleStatusChange}
          handleFilterSubmission={handleFilterSubmission}
        />
         <div className='p-1 my-2  text-grey-400 hover:bg-gray-400 cursor-pointer'>
          <FaSearch className="text-2xl" onClick={()=> {;fetchContacts(0); setCurrentPage(0); setError(null)}}/>    
          </div>
        
       
        <ContactDialog
          contact={createFormContact}
          formErrors={createContactFormErrors}
          onInputChange={handleInputChangeCreateForm}
          formRef={createFormRef}
          isLoading={isLoadingCreateCtctIcon}
          response={responseCreateCtcIcon}
          handleSubmit={handleCreateContactSubmit}
        />
        {error ? (
          <h2 className="text-red-500">{error}</h2>
        ) : noContacts ? (
          <h2>No contacts match the specified filters</h2>
        ) : (
          <>
            <ContactList 
              contacts={contacts} 
              isLoadingExt = {isLoadingUpdateContact}
              response = {responseUpdateContact}
              handleSubmit={handleUpdateContactSubmit}
              onInputChange={handleInputChangeUpdateForm}
              formErrors={formErrorsUpdateContact}
              updateFormContact = {updateFormContact}
              setUpdateFormContact = {setUpdateFormContact}
              setFormErrorsUpdateContact = {setFormErrorsUpdateContact}
            />
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPagesRef.current}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              handleFirstPage={handleFirstPage}
              handleLastPage={handleLastPage}
            />
          </>
        )}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center mt-auto w-full">
        <p>MONSOFT CRM &trade;  2024. <span className='ml-2'>ALL RIGHTS RESERVED</span></p>
      </footer>
    </div>
  );
  
};




function buildFetchQuery(limit:number, offset:number, filters:Filters){
  let query = `limit=${limit}&offset=${offset}`
  if (filters.email!=="") query += `&email=${filters.email}`;
  if (filters.company!=="") query += `&company=${filters.company}`;
  if (filters.firstName!=="") query += `&firstName=${filters.firstName}`;
  if (filters.lastName!=="") query += `&lastName=${filters.lastName}`;
  if (filters.position!=="") query += `&position=${filters.position}`;
  if (filters.status!=="" && filters.status !== "Any") query += `&status=${filters.status}`;
  return query
}

function areEqualFilters(f1: Filters, f2: Filters): boolean {
  return (
    f1.firstName === f2.firstName &&
    f1.lastName === f2.lastName &&
    f1.email === f2.email &&
    f1.company === f2.company &&
    f1.position === f2.position &&
    f1.status === f2.status
  );
}

function calculateLimit() {
  const width = window.innerWidth;
  if (width >= 1200) { 
      return 10; 
  } else if (width >= 768) { 
      return 6; 
  } else if (width >= 480) { 
      return 4;
  } else {
      return 1; //can you even browse the web?
  }
}



export default App;
export type {Contact, ContactFormErrors}