import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Harvest } from './harvest.entity';

@Entity()
export class PlantedCulture {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    quantityPlanted: number;

    @ManyToOne(() => Harvest, (harvast) => harvast.cultures, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'harvast_id' })
    harvests: Harvest;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
