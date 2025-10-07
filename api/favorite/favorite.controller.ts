import { Body, Controller, HttpCode, HttpStatus, NotFoundException, Param, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { AddFavoriteDto } from './dto/addFavorite.dto';

@Controller('user/:userId/favorites')
export class FavoriteController {
    constructor(private readonly favoriteService: FavoriteService) { }

    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    async addFavorite(@Param('userId') userId: string, @Body() dto: AddFavoriteDto): Promise<void> {
        await this.favoriteService.addFavorite(+userId, dto);
    }
}