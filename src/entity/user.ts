import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { count } from 'console';

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ select: false })
  password: string;

  @Column()
  email: string;
}