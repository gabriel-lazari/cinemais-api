import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateDTO } from './dto/create.dto';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() dto: CreateDTO): Promise<UserEntity> {
        return await this.userService.create(dto);
    }

    @Get()
    async list(): Promise<UserEntity[]> {
        return await this.userService.list();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<UserEntity> {
        return await this.userService.findById(+id);
    }
}