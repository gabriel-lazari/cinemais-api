import { Injectable } from '@nestjs/common';
import { MediaRepository } from './media.repository';
import { CreateDTO } from './dto/create.dto';
import { MediaEntity } from './media.entity';

@Injectable()
export class MediaService {
    constructor(private readonly mediaRepository: MediaRepository) { }

    async create(data: CreateDTO): Promise<MediaEntity> {
        return await this.mediaRepository.create(data);
    }

    async list() {
        return await this.mediaRepository.findAll();
    }
}