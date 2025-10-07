import { IsNotEmpty, MinLength } from "class-validator";

export class CreateDTO {
    @IsNotEmpty() @MinLength(3)
    title: string;

    @IsNotEmpty() @MinLength(3)
    description: string;

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    releaseYear: number;

    @IsNotEmpty()
    genre: string;
}