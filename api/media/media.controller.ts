import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateDTO } from './dto/create.dto';
import { MediaEntity } from './media.entity';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @Post()
    async create(@Body() dto: CreateDTO): Promise<MediaEntity> {
        return await this.mediaService.create(dto);
    }

    @Get()
    async list(): Promise<MediaEntity[]> {
        return await this.mediaService.list();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<MediaEntity> {
        return await this.mediaService.findById(+id);
    }
}