import { Injectable, NotFoundException } from '@nestjs/common';
import { MediaRepository } from './media.repository';
import { CreateDTO } from './dto/create.dto';
import { MediaEntity } from './media.entity';

@Injectable()
export class MediaService {
    constructor(private readonly mediaRepository: MediaRepository) { }

    async create(data: CreateDTO): Promise<MediaEntity> {
        return await this.mediaRepository.create(data);
    }

    async list(): Promise<MediaEntity[]> {
        return await this.mediaRepository.list();
    }

    async findById(id: number): Promise<MediaEntity> {
        const media = await this.mediaRepository.findById(id);

        if (!media) {
            throw new NotFoundException(`Mídia com id ${id} não encontrada`);
        }

        return media;
    }
}