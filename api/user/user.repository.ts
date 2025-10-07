import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateDTO } from './dto/create.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly ormRepo: Repository<UserEntity>,
  ) { }

  async create(data: CreateDTO): Promise<UserEntity> {
    const user = this.ormRepo.create(data);

    return await this.ormRepo.save(user);
  }

  async list(): Promise<UserEntity[]> {
    return await this.ormRepo.find();
  }
}