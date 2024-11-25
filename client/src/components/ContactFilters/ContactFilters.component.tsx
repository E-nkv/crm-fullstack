import React from 'react';
import * as Form from '@radix-ui/react-form';

interface Filters {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  position: string;
  status: string;
}

interface Props {
  filters: Filters;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleStatusChange: (value: string) => void;
  handleFilterSubmission: () => void
}


const ContactFilters: React.FC<Props> = ({ filters, handleFilterChange, handleStatusChange, handleFilterSubmission }) => {
  return (
    <Form.Root className=" flex flex-wrap items-center gap-x-2 gap-y-1">
      <Form.Field name="firstName" className="flex items-center gap-1">
        <Form.Label className="text-sm mr-1">First Name</Form.Label>
        <Form.Control asChild>
          <input
            className="p-1 border rounded text-xs hover:bg-gray-50"
            type="text"
            name="firstName"
            value={filters.firstName}
            onChange={handleFilterChange}
            onBlur={handleFilterSubmission}
            onKeyDown = {(e: any) => {if (e.key==="Enter"||e.key==="Escape") handleFilterSubmission();}}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field name="lastName" className="flex items-center gap-1">
        <Form.Label className="text-sm mr-1">Last Name</Form.Label>
        <Form.Control asChild>
          <input
            className="p-1 border rounded text-xs hover:bg-gray-50"
            type="text"
            name="lastName"
            value={filters.lastName}
            onChange={handleFilterChange}
            onBlur={handleFilterSubmission}
            onKeyDown = {(e: any) => {if (e.key==="Enter"||e.key==="Escape") handleFilterSubmission();}}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field name="email" className="flex items-center gap-1">
        <Form.Label className="text-sm mr-1">Email</Form.Label>
        <Form.Control asChild>
          <input
            className="p-1 border rounded text-xs hover:bg-gray-50"
            type="email"
            name="email"
            value={filters.email}
            onChange={handleFilterChange}
            onBlur={handleFilterSubmission}
            onKeyDown = {(e: any) => {if (e.key==="Enter"||e.key==="Escape") handleFilterSubmission();}}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field name="company" className="flex items-center gap-1">
        <Form.Label className="text-sm mr-1">Company</Form.Label>
        <Form.Control asChild>
          <input
            className="p-1 border rounded text-xs hover:bg-gray-50"
            type="text"
            name="company"
            value={filters.company}
            onChange={handleFilterChange}
            onBlur={handleFilterSubmission}
            onKeyDown = {(e: any) => {if (e.key==="Enter"||e.key==="Escape") handleFilterSubmission();}}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field name="position" className="flex items-center gap-1">
        <Form.Label className="text-sm mr-1">Position</Form.Label>
        <Form.Control asChild>
          <input
            className="p-1 border rounded text-xs hover:bg-gray-50"
            type="text"
            name="position"
            value={filters.position}
            onChange={handleFilterChange}
            onBlur={handleFilterSubmission}
            onKeyDown = {(e: any) => {if (e.key==="Enter"||e.key==="Escape") handleFilterSubmission();}}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field name="status" className="flex items-center gap-1">
        <Form.Label className="text-sm mr-1">Status</Form.Label>
        <Form.Control asChild>
          <select
            className="p-1 border rounded text-xs hover:bg-gray-300"
            name="status"
            value={filters.status}
            onChange={(e) => {handleStatusChange(e.target.value)}}
          >
            <option value="Any">Any</option>
            <option value="New">New</option>
            <option value="Qualified">Qualified</option>
            <option value="Contacted">Contacted</option>
            <option value="Lost">Lost</option>
          </select>
        </Form.Control>
      </Form.Field>
    </Form.Root>
  );
};

export default ContactFilters;
export type {Filters};
