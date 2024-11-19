import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contactsService/service/contact.entity';
import { ContactsController } from './contactsService/service/contacts';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'your-username',
      password: 'your-password',
      database: 'crm',
      entities: [Contact],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Contact]),
  ],
  controllers: [ContactsController],
  providers: [],
})
export class AppModule {}
