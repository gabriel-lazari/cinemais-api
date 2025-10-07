import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaEntity } from './media.entity';
import { CreateDTO } from './dto/create.dto';

@Injectable()
export class MediaRepository {
  constructor(
    @InjectRepository(MediaEntity)
    private readonly ormRepo: Repository<MediaEntity>,
  ) { }

  async create(data: CreateDTO): Promise<MediaEntity> {
    const media = this.ormRepo.create(data);

    return await this.ormRepo.save(media);
  }

  async list(): Promise<MediaEntity[]> {
    return await this.ormRepo.find();
  }

  async findById(id: number): Promise<MediaEntity | null> {
    return this.ormRepo.findOne({ where: { id } });
  }
}