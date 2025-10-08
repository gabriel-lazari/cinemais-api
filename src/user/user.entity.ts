import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    Generated,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    @Generated('uuid')
    uuid: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    @Column({ name: 'name', length: 100, nullable: false })
    name: string;

    @Column({ name: 'is_active', nullable: false, default: true })
    is_active: boolean;
}
