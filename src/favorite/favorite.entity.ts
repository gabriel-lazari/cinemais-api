import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    Generated,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { MediaEntity } from '../media/media.entity';

@Entity({ name: 'favorite' })
export class FavoriteEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    @Generated('uuid')
    uuid: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    @ManyToOne(() => UserEntity, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => MediaEntity, { eager: true })
    @JoinColumn({ name: 'media_id' })
    media: MediaEntity;
}