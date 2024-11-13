import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class DefaultQuoteLine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  unitPrice: number;

  @ManyToOne(() => User, (user) => user.defaultQuoteLines)
  user: Relation<User>;

  constructor(description: string, unitPrice: number) {
    this.description = description;
    this.unitPrice = unitPrice;
  }
}
