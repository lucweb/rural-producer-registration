import { Entity, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { RuralProperty } from './rural-property.entity';
import { PlantedCulture } from './planted-culture.entity';

@Entity()
export class Harvest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => RuralProperty, (ruralProperty) => ruralProperty.harvests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rural_property_id' })
  ruralProperty: RuralProperty;

  @OneToMany(() => PlantedCulture, (culture) => culture.harvests, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true
  })
  cultures: PlantedCulture[];

  @Column({ default: 0 })
  totalArea: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
