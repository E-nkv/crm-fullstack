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
} from '@nestjs/common';
import MySqlStore from '../storage/mySqlStore';
import { validatePartialContact } from './validations';

const store = new MySqlStore();

@Controller('contacts')
export class ContactsController {
  @Get()
  async getContacts(
    @Query() filters,
    @Query('limit') limit,
    @Query('offset') offset,
  ) {
    try {
      const contacts = await store.getContacts(filters, {
        limit: Number(limit),
        offset: Number(offset),
      });
      return contacts;
    } catch (error) {
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
  async createContact(@Body() contact) {
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
    } catch (error) {
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
  async updateContact(@Param('id') id, @Body() contact) {
    const errors = validatePartialContact(contact);
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
          { status: HttpStatus.NOT_FOUND, error: 'Contact not found' },
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
          { status: HttpStatus.NOT_FOUND, error: 'Contact not found' },
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
