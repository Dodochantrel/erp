import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { QuoteLine } from './quote-line.entity';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  companyAddress: string;

  @Column()
  companyCity: string;

  @Column({
    nullable: true,
  })
  companySiret: string | null;

  @Column({
    nullable: true,
  })
  companyPhone: string | null;

  @Column()
  customerName: string;

  @Column()
  customerAddress: string;

  @Column()
  customerCity: string;

  @Column({
    nullable: true,
  })
  customerSiret: string | null;

  @Column({
    nullable: true,
  })
  customerPhone: string | null;

  @Column()
  quoteNumber: string;

  @Column()
  quoteDate: Date;

  @Column()
  quoteExpirationDate: Date;

  @Column()
  quoteTotal: number;

  @Column()
  quoteTaxes: number;

  @OneToMany(() => QuoteLine, (quoteLine) => quoteLine.quote)
  quoteLines: Relation<QuoteLine[]>;

  @Column({
    nullable: true,
    type: 'text',
  })
  moreDetails: string | null;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt: Date;
}
