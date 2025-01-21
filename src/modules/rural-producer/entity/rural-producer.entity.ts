import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { RuralProperty } from './rural-property.entity';

@Entity()
export class RuralProducer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  cpfCnpj: string;

  @OneToMany(() => RuralProperty, (ruralProperty) => ruralProperty.producer, { 
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE',
    eager: true 
   })
  ruralProperties: RuralProperty[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}