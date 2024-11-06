import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Event } from './event.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class TypeEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @OneToMany(() => Event, (event) => event.type)
  events: Relation<Event[]>;

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn()
  user: Relation<User>;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }
}
