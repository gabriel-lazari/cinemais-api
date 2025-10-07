import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateDTO } from './dto/create.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async create(data: CreateDTO): Promise<UserEntity> {
        return await this.userRepository.create(data);
    }

    async list() {
        return await this.userRepository.list();
    }
}