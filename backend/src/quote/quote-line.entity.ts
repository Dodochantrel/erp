import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Quote } from './quote.entity';

@Entity()
export class QuoteLine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  unitPrice: number;

  @ManyToOne(() => Quote, (quote) => quote.quoteLines)
  quote: Relation<Quote>;

  constructor(description: string, quantity: number, unitPrice: number) {
    this.description = description;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }
}
