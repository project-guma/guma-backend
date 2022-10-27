import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items } from '../entities/items';

@Module({
    imports: [TypeOrmModule.forFeature([Items])],
    controllers: [ItemController],
    providers: [ItemService],
})
export class ItemModule {}
