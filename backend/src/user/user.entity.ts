import { Customer } from 'src/customer/customer.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Relation } from 'typeorm';

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
}
