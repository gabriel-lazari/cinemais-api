import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateDTO } from './dto/create.dto';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @Post()
    async create(@Body() dto: CreateDTO) {
        const mediaCreated = await this.mediaService.create(dto);

        return { message: 'Mídia criada com sucesso', data: mediaCreated };
    }
}