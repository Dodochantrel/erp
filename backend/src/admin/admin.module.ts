import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import * as dotenv from 'dotenv';
import { MailModule } from 'src/mail/mail.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AuthModule } from 'src/auth/auth.module';

dotenv.config();

@Module({
  imports: [MailModule, UserModule, AuthModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
