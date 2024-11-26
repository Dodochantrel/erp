import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { DatabaseModule } from 'src/database/database.module';
import { defaultQuoteLineProviders, quoteLineProviders, quoteProviders } from './quote.providers';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [QuoteController],
  providers: [QuoteService, ...quoteProviders, ...defaultQuoteLineProviders, ...quoteLineProviders],
})
export class QuoteModule {}
