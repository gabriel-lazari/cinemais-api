import { Injectable, NotFoundException } from '@nestjs/common';
import { MediaRepository } from '../media/media.repository';
import { FavoriteRepository } from './favorite.repository';
import { UserRepository } from 'api/user/user.repository';
import { AddFavoriteDto } from './dto/addFavorite.dto';

@Injectable()
export class FavoriteService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly mediaRepository: MediaRepository,
        private readonly favoriteRepository: FavoriteRepository,
    ) { }

    async addFavorite(userId: number, data: AddFavoriteDto): Promise<void> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new NotFoundException(`Usuário ${userId} não existe`);
        }
        
        const media = await this.mediaRepository.findById(data.mediaId);

        if (!media) {
            throw new NotFoundException(`Mídia ${data.mediaId} não encontrada no catálogo`);
        }

        await this.favoriteRepository.addFavorite(userId, data);
    }
}