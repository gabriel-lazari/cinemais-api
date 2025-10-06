import { IsNotEmpty, MinLength } from "class-validator";

export class CreateDTO {
    @IsNotEmpty() @MinLength(3)
    name: string;

    @MinLength(6)
    password: string;
}