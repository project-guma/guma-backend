import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSubscribeDto {
    @IsString()
    @ApiProperty({ example: 90, description: '구독 주기' })
    cycle: number;
}
