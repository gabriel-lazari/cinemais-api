import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateDTO } from './dto/create.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() dto: CreateDTO) {
        return await this.userService.create(dto);
    }
}