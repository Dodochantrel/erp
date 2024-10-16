import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { UserModule } from 'src/user/user.module';
import { DatabaseModule } from 'src/database/database.module';
import { eventProviders } from './event.provider';
import { typeEventProviders } from './type-event.provider';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [EventController],
  providers: [...eventProviders, EventService, ...typeEventProviders],
})
export class EventModule {}
