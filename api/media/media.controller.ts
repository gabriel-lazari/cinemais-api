import { Body, Controller, Post } from "@nestjs/common";
import { MediaEntity } from "./media.entity";
import { MediaRepository } from "./media.repository";
import { CreateDTO } from "./dto/create.dto";
import { MediaService } from "./media.service";

@Controller('/media')
export class MediaController {
    constructor(
        private mediaRepository: MediaRepository,
        private mediaService: MediaService
    ) {};
    
    @Post()
    async create(@Body() userData: CreateDTO) {
        const mediaEntity = new MediaEntity();

        mediaEntity.name = userData.name;
        mediaEntity.password = userData.password;

        const mediaCreated = await this.mediaService.create(mediaEntity);

        return { message: 'usuario criado com sucesso' };
    }
}