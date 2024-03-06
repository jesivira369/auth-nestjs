import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @ApiProperty({
        name: 'email',
        description: 'The email of the user to login with',
        required: true,
        type: String,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        name: 'password',
        description: 'The password of the user to login with',
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}