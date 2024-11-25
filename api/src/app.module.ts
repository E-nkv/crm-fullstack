import { Module } from '@nestjs/common';

import { ContactsController } from './contactsService/service/contacts';

@Module({
  imports: [
  ],
  controllers: [ContactsController],
  providers: [],
})
export class AppModule {}
