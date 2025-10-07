import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { MediaRepository } from '../media/media.repository';
import { FavoriteRepository } from './favorite.repository';
import { UserRepository } from 'api/user/user.repository';
import { AddFavoriteDto } from './dto/addFavorite.dto';
import { FavoriteEntity } from './favorite.entity';

@Injectable()
export class FavoriteService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly mediaRepository: MediaRepository,
        private readonly favoriteRepository: FavoriteRepository
    ) { }

    async create(userId: number, data: AddFavoriteDto): Promise<void> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new NotFoundException(`Usuário ${userId} não existe`);
        }

        const media = await this.mediaRepository.findById(data.mediaId);

        if (!media) {
            throw new NotFoundException(`Mídia ${data.mediaId} não encontrada no catálogo`);
        }

        const isExistFavorite = await this.favoriteRepository.existFavorite(userId, data);
        
        if (isExistFavorite) {
            throw new ConflictException(`Esse mídia ${data.mediaId} já é um favorito`);
        }

        await this.favoriteRepository.create(userId, data);
    }

    async list(userId: number): Promise<FavoriteEntity[]>  {
        return await this.favoriteRepository.list(userId);
    }
}