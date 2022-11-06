import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items } from '../entities/items';
import { ItemRepository } from './item.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Items])],
    controllers: [ItemController],
    providers: [ItemService, ItemRepository],
})
export class ItemModule {}
