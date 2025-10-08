import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create.media.dto';
import { MediaEntity } from './media.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @Post()
    @ApiOperation({ summary: 'Cria uma nova mídia' })
    async create(@Body() dto: CreateMediaDto): Promise<MediaEntity> {
        return await this.mediaService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Lista mídias' })
    async list(): Promise<MediaEntity[]> {
        return await this.mediaService.list();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Lista mídias por ID' })
    async findById(@Param('id') id: string): Promise<MediaEntity> {
        return await this.mediaService.findById(+id);
    }
}
