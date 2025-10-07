import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UserEntity } from './user.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @ApiOperation({ summary: 'Cria um novo usuário' })
    async create(@Body() dto: CreateUserDto): Promise<UserEntity> {
        return await this.userService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Lista usuários' })
    async list(): Promise<UserEntity[]> {
        return await this.userService.list();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Busca usuário por ID' })
    async findById(@Param('id') id: string): Promise<UserEntity> {
        return await this.userService.findById(+id);
    }
}