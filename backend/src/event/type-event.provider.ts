import { DataSource } from 'typeorm';
import { TypeEvent } from './type-event.entity';

export const typeEventProviders = [
  {
    provide: 'TYPE_EVENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TypeEvent),
    inject: ['DATA_SOURCE'],
  },
];
