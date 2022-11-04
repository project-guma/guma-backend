import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscribeList } from '../entities/subscribeList';
import { Items } from '../entities/items';
import { Repository } from 'typeorm';
import { Categories } from '../entities/Categories';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Items) private itemRepository: Repository<Items>,
        @InjectRepository(Categories) private categoryRepository: Repository<Categories>,
    ) {}

    async getItemListByCategory(param) {
        const { CategoryId } = param;
        return await this.itemRepository.find({ CategoryId: CategoryId });
    }

    async addItem(body) {
        const { CategoryId, name, link } = body;

        const newItem = this.itemRepository.create();
        newItem.name = name;
        newItem.link = link;
        newItem.CategoryId = CategoryId;
        return await this.itemRepository.save(newItem);
    }

    async deleteItem(param) {
        const { ItemId } = param;

        return await this.itemRepository.delete({ id: Number(ItemId) });
    }

    async getCategoryList() {
        return await this.categoryRepository.find();
    }
}
