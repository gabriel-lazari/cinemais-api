import { IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
    @ApiProperty({ example: 'Usuário 1', description: 'Nome completo do usuário' })
    @IsNotEmpty() @MinLength(3)
    name: string;
}