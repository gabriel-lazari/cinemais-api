import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'media' })
export class MediaEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({ name: 'created_at' })
    created_at: string;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: string;
    
    @PrimaryGeneratedColumn('uuid')
    uuid: string
    
    @Column({ name: 'title', length: 100, nullable: false })
    title: string;

    @Column({ name: 'description', length: 300, nullable: false })
    description: string;

    @Column({ name: 'type', nullable: true })
    type: string;

    @Column({ name: 'releaseYear', nullable: true })
    releaseYear: number;

    @Column({ name: 'genre', nullable: true })
    genre: string;

    @Column({ name: 'is_active', nullable: false, default: true })
    is_active: boolean;
}