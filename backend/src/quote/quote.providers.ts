import { DataSource } from 'typeorm';
import { Quote } from './quote.entity';
import { DefaultQuoteLine } from './default-quote-line.entity';
import { QuoteLine } from './quote-line.entity';

export const quoteProviders = [
  {
    provide: 'QUOTE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Quote),
    inject: ['DATA_SOURCE'],
  },
];

export const defaultQuoteLineProviders = [
  {
    provide: 'DEFAULT_QUOTE_LINE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(DefaultQuoteLine),
    inject: ['DATA_SOURCE'],
  },
];

export const quoteLineProviders = [
  {
    provide: 'QUOTE_LINE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(QuoteLine),
    inject: ['DATA_SOURCE'],
  },
];
