import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { MediaRepository } from '../media/media.repository';
import { FavoriteRepository } from './favorite.repository';
import { UserRepository } from 'src/user/user.repository';
import { CreateFavoriteDTO } from './dto/create.favorite.dto';
import { FavoriteEntity } from './favorite.entity';

@Injectable()
export class FavoriteService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly mediaRepository: MediaRepository,
        private readonly favoriteRepository: FavoriteRepository
    ) { }

    async create(userId: number, data: CreateFavoriteDTO): Promise<void> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new NotFoundException(`Usuário ${userId} não existe`);
        }

        const media = await this.mediaRepository.findById(data.mediaId);

        if (!media) {
            throw new NotFoundException(`Mídia com id ${data.mediaId} não encontrada no catálogo`);
        }

        const isExistFavorite = await this.favoriteRepository.existFavorite(userId, data.mediaId);

        if (isExistFavorite) {
            throw new ConflictException(`Esse mídia com id ${data.mediaId} já é um favorito`);
        }

        await this.favoriteRepository.create(userId, data);
    }

    async list(userId: number): Promise<FavoriteEntity[]> {
        return await this.favoriteRepository.list(userId);
    }

    async remove(userId: number, mediaId: number): Promise<void> {
        const isExistFavorite = await this.favoriteRepository.existFavorite(userId, mediaId);

        if (!isExistFavorite) {
            throw new NotFoundException(`Não existe mídia ${mediaId} como favorito`);
        }

        return await this.favoriteRepository.remove(userId, mediaId);
    }
}