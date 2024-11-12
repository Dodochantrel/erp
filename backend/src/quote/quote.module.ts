import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { DatabaseModule } from 'src/database/database.module';
import { quoteProviders } from './quote.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [QuoteController],
  providers: [QuoteService, ...quoteProviders],
})
export class QuoteModule {}
