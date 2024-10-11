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

export enum TypeEvent {
  WORK = 'work',
  MEETING = 'meeting',
  OTHER = 'other',
}

export const fromStringToTypeEvent = (type: string): TypeEvent => {
  switch (type) {
    case 'work':
      return TypeEvent.WORK;
    case 'meeting':
      return TypeEvent.MEETING;
    default:
      return TypeEvent.OTHER;
  }
};

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

  @Column({
    type: 'enum',
    enum: TypeEvent,
    default: TypeEvent.OTHER,
  })
  type: TypeEvent;

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn()
  user: Relation<User>;

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
