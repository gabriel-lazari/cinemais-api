import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({ name: 'created_at' })
    created_at: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: string;

    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @Column({ name: 'name', length: 100, nullable: false })
    name: string;

    @Column({ name: 'is_active', nullable: false, default: true })
    is_active: boolean;
}