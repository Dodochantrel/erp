import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { customerProviders } from './customer.provider';
import { UserModule } from 'src/user/user.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [CustomerController],
  providers: [...customerProviders, CustomerService],
})
export class CustomerModule {}
