import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Event } from './event.entity';

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

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }
}
