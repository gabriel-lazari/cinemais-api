import { Injectable } from '@nestjs/common';
import { MediaRepository } from './media.repository';
import { CreateDTO } from './dto/create.dto';
import { MediaEntity } from './media.entity';

@Injectable()
export class MediaService {
    constructor(private readonly mediaRepository: MediaRepository) { }

    async create(data: CreateDTO): Promise<MediaEntity> {
        return this.mediaRepository.create(data);
    }
}