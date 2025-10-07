import { Body, Controller, HttpCode, HttpStatus, Get, Param, Post, Delete } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { AddFavoriteDto } from './dto/addFavorite.dto';

@Controller('user/:userId/favorites')
export class FavoriteController {
    constructor(private readonly favoriteService: FavoriteService) { }

    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    async create(@Param('userId') userId: string, @Body() dto: AddFavoriteDto) {
        await this.favoriteService.create(+userId, dto);
    }

    @Get()
    async list(@Param('userId') userId: string) {
        return await this.favoriteService.list(+userId);
    }

    @Delete(':mediaId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('userId') userId: string, @Param('mediaId') mediaId: string): Promise<void> {
        await this.favoriteService.remove(+userId, +mediaId);
    }
}