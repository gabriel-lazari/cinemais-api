import { Body, Controller, HttpCode, HttpStatus, Get, Param, Post, Delete } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDTO } from './dto/create.favorite.dto';
import { FavoriteEntity } from './favorite.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user/:userId/favorites')
export class FavoriteController {
    constructor(private readonly favoriteService: FavoriteService) { }

    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Adicionar filme/série ao favoritos do usuário' })
    async create(@Param('userId') userId: string, @Body() dto: CreateFavoriteDTO): Promise<void> {
        await this.favoriteService.create(+userId, dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar filmes/séries favoritos do usuário' })
    async list(@Param('userId') userId: string): Promise<FavoriteEntity[]> {
        return await this.favoriteService.list(+userId);
    }

    @Delete(':mediaId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remover filme/série ao favoritos do usuário' })
    async remove(@Param('userId') userId: string, @Param('mediaId') mediaId: string): Promise<void> {
        await this.favoriteService.remove(+userId, +mediaId);
    }
}