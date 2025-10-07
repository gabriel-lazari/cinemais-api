import { IsNotEmpty, MinLength, IsEnum } from "class-validator";
import { MediaType } from '../domain/media-type.enum';

export class CreateDTO {
    @IsNotEmpty() @MinLength(3)
    title: string;

    @IsNotEmpty() @MinLength(3)
    description: string;

    @IsEnum(MediaType, { message: 'type must be either movie or series' })
    type: MediaType;

    @IsNotEmpty()
    releaseYear: number;

    @IsNotEmpty()
    genre: string;
}