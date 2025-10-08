import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { FavoriteEntity } from './favorite.entity';
import { FavoriteRepository } from './favorite.repository';
import { MediaModule } from 'src/media/media.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([FavoriteEntity]), MediaModule, UserModule],
    controllers: [FavoriteController],
    providers: [FavoriteService, FavoriteRepository],
})
export class FavoriteModule {}
