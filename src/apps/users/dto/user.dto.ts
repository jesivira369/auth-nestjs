import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserDto {
    @ApiProperty({
        name: 'email',
        description: 'The email of the user',
        required: true,
        type: String,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        name: 'password',
        description: 'The password of the user',
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}