import { Module } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { SubscribeController } from './subscribe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/user';
import { SubscribeList } from '../entities/subscribeList';
import { Alarm } from '../entities/alarm';

@Module({
    imports: [TypeOrmModule.forFeature([SubscribeList, Alarm])],
    providers: [SubscribeService],
    controllers: [SubscribeController],
})
export class SubscribeModule {}
