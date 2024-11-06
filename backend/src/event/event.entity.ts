import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Dayjs } from 'dayjs';
import { TypeEvent } from './type-event.entity';
import { Customer } from 'src/customer/customer.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp',
  })
  start: Dayjs;

  @Column({
    type: 'timestamp',
  })
  end: Dayjs;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => TypeEvent, (typeEvent) => typeEvent.events)
  @JoinColumn()
  type: Relation<TypeEvent>;

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn()
  user: Relation<User>;

  @ManyToOne(() => Customer, (customer) => customer.events)
  @JoinColumn()
  customer: Relation<Customer>;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt: Date;

  constructor(start: Dayjs, end: Dayjs, title: string) {
    this.start = start;
    this.end = end;
    this.title = title;
  }
}
