import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { companyProviders } from './company.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, ...companyProviders, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
