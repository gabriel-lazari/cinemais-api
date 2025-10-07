import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteEntity } from './favorite.entity';
import { AddFavoriteDto } from './dto/addFavorite.dto';

@Injectable()
export class FavoriteRepository {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly ormRepo: Repository<FavoriteEntity>,
  ) { }

  async addFavorite(userId: number, data: AddFavoriteDto): Promise<void> {
    const favorite = this.ormRepo.create({
      user: { id: userId },
      media: { id: data.mediaId }
    });

    await this.ormRepo.save(favorite);
  }
}