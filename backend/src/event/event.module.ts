import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { UserModule } from 'src/user/user.module';
import { DatabaseModule } from 'src/database/database.module';
import { eventProviders } from './event.providers';
import { typeEventProviders } from './type-event.providers';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [DatabaseModule, UserModule, CustomerModule],
  controllers: [EventController],
  providers: [...eventProviders, EventService, ...typeEventProviders],
})
export class EventModule {}
