import { IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { MediaType } from '../domain/media-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMediaDto {
    @ApiProperty({ example: 'Matrix', description: 'Nome de um filme/série' })
    @IsNotEmpty()
    @MinLength(3)
    title: string;

    @ApiProperty({
        example: 'Um dev descobre que o mundo é uma simulação e precisa debugá-lo',
        description: 'Resumo do filme ou série',
    })
    @IsNotEmpty()
    @MinLength(3)
    description: string;

    @ApiProperty({ example: 'movie', description: 'movie/series' })
    @IsEnum(MediaType, { message: 'type must be either movie or series' })
    type: MediaType;

    @IsNotEmpty()
    @ApiProperty({ example: '2000', description: 'Ano de lançamento do filme' })
    releaseYear: number;

    @IsNotEmpty()
    @ApiProperty({ example: 'Ficção Científica', description: 'Categoria do filme/série' })
    genre: string;
}
