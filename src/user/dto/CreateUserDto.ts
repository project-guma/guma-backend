import { IsEmail, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @ApiProperty({ description: '닉네임' })
    readonly nickname: string;
}
