import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscribeList } from '../entities/subscribeList';
import { Items } from '../entities/items';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
    constructor(@InjectRepository(Items) private itemRepository: Repository<Items>) {}

    async getItemListByCategory(param) {
        const { CategoryId } = param;
        return await this.itemRepository.find({ CategoryId: CategoryId });
    }
}
