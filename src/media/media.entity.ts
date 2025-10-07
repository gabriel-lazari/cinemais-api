import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Generated } from "typeorm";
import { MediaType } from './domain/media-type.enum';

@Entity({ name: 'media' })
export class MediaEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
    
    @Column()
    @Generated('uuid')
    uuid: string

    @Column({ name: 'title', length: 100, nullable: false })
    title: string;

    @Column({ name: 'description', length: 300, nullable: false })
    description: string;

    @Column({
        type: 'enum',
        enum: MediaType,
    })
    type: MediaType;

    @Column({ name: 'releaseYear', nullable: true })
    releaseYear: number;

    @Column({ name: 'genre', nullable: true })
    genre: string;

    @Column({ name: 'is_active', nullable: false, default: true })
    is_active: boolean;
}