import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly ormRepo: Repository<UserEntity>,
  ) { }

  async create(data: CreateUserDto): Promise<UserEntity> {
    const user = this.ormRepo.create(data);

    return await this.ormRepo.save(user);
  }

  async list(): Promise<UserEntity[]> {
    return await this.ormRepo.find();
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.ormRepo.findOne({ where: { id } });
  }
}