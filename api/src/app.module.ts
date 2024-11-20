import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contactsService/service/contact.entity';
import { ContactsController } from './contactsService/service/contacts';

@Module({
  imports: [
  ],
  controllers: [ContactsController],
  providers: [],
})
export class AppModule {}
