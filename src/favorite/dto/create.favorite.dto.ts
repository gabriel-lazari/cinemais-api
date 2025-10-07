import { IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDTO {
    @ApiProperty({ example: '1', description: 'ID do filme/série' })
    @IsNumber()
    mediaId: number;
}