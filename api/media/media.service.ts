import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateDTO } from "./dto/create.dto";
import { MediaEntity } from "./media.entity";

@Injectable()
export class MediaService {
    constructor(
        @InjectRepository(MediaEntity)
        private readonly mediaRepository: Repository<MediaEntity>
    ) {}

    async create(media: MediaEntity) {
        const created = await this.mediaRepository.save(media);
        
        return created;
    }
}