import { Module } from '@nestjs/common';
import { BucketController } from './bucket.controller';
import { BucketService } from './bucket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bucket } from '../entities/Bucket';

@Module({
    imports: [TypeOrmModule.forFeature([Bucket])],
    controllers: [BucketController],
    providers: [BucketService],
})
export class BucketModule {}
