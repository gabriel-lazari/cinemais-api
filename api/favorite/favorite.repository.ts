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

  async create(userId: number, data: AddFavoriteDto): Promise<void> {
    const favorite = this.ormRepo.create({
      user: { id: userId },
      media: { id: data.mediaId }
    });

    await this.ormRepo.save(favorite);
  }

  async existFavorite(userId: number, data: AddFavoriteDto): Promise<Boolean> {
    const items = await this.ormRepo.find({
      where: {
        user: { id: userId },
        media: { id: data.mediaId }
      }
    });

    return items.length > 0 ? true : false;
  }

  async list(userId: number): Promise<FavoriteEntity[]> {
    return await this.ormRepo.find({
      where: {
        user: { id: userId }
      }
    });
  }
}