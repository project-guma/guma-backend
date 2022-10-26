import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscribeDto {
    @IsString()
    @ApiProperty({ example: 90, description: '구독 주기' })
    cycle: number;

    @IsNumber()
    @ApiProperty({ example: 1, description: '구독 아이템 ID' })
    ItemId: number;
}
