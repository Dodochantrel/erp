import { Customer } from 'src/customer/customer.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Relation, OneToOne, JoinColumn } from 'typeorm';
import { Event } from '../event/event.entity';
import { Company } from './company.entity';
import { TypeEvent } from 'src/event/type-event.entity';
import { DefaultQuoteLine } from 'src/quote/default-quote-line.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'client' })
  role: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ length: 500, nullable: true })
  token: string;

  @Column({ default: false })
  isValidate: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Customer, (customer) => customer.user)
  customers: Relation<Customer>[];

  @OneToMany(() => Event, (event) => event.user)
  events: Relation<Event>[];

  @OneToMany(() => TypeEvent, (typeEvent) => typeEvent.user)
  typeEvents: Relation<TypeEvent>[];

  @OneToOne(() => Company, (company) => company.user)
  @JoinColumn()
  company: Company;

  @OneToMany(() => DefaultQuoteLine, (defaultQuoteLine) => defaultQuoteLine.user)
  defaultQuoteLines: Relation<DefaultQuoteLine>[];
}
