import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { RuralProducer } from './rural-producer.entity';
import { Harvest } from './harvest.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class RuralProperty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  farmName: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column('float')
  totalArea: number;

  @Column('float')
  agriculturalArea: number;

  @Column('float')
  vegetationArea: number;

  @ManyToOne(() => RuralProducer, (producer) => producer.ruralProperties, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'producer_id' }) 
  producer: RuralProducer;

  @OneToMany(() => Harvest, (harvest) => harvest.ruralProperty, { eager: true })
  harvests: Harvest[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}