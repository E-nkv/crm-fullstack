import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';

import { validatePartialContact } from './validations';
import {InMemStore} from '../storage/inMemStore';
import {Contact} from './contact.entity'
import { FileInterceptor } from '@nestjs/platform-express';

const store = new InMemStore()

export type Filters = {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  position?: string;
  status?: string;
};

@Controller('contacts')
export class ContactsController {
  @Get()
  async getContacts(
    @Query() filters:Filters,
    @Query('limit') limit,
    @Query('offset') offset,
  ) {
    try {
      const contacts = await store.getContacts(filters, {
        limit: limit!=undefined? Number(limit) : 20,
        offset: offset!=undefined? Number(offset): 0,
      });
      return contacts;
    } catch (err) {
      console.log('error with getting contacts', err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Could not retrieve contacts',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createContact(@Body() contact:Contact) {
    const errors = validatePartialContact(contact);
    if (errors.length > 0) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: errors.join(', ') },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const newContact = await store.createContact(contact);
      return newContact;
    } catch (err) {
      console.log('error with creating contact', err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Could not create contact',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor(''))
  async updateContact(@Param('id') id, @Body() contact :Partial<Contact>) {
    console.log(id)
    console.log(contact)
    const errors = validatePartialContact(contact);
    let n = Number(id)
    if (isNaN(n) || n < 0) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: "invalid contact id"},
        HttpStatus.BAD_REQUEST,
      );
    }
    if (errors.length > 0) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: errors.join(', ') },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const updatedContact = await store.updateContact(Number(id), contact);
      if (!updatedContact) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Contact not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return updatedContact;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Could not update contact',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getContact(@Param('id') id) {
    try {
      const contact = await store.getContact(Number(id));
      if (!contact) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Contact not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return contact;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Could not retrieve contact',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
