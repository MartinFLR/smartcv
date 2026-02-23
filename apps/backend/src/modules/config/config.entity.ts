import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AppConfig {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  key!: string;

  @Column({ nullable: true })
  value!: string;
}
