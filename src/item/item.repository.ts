import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscribeList } from '../entities/subscribeList';
import { Items } from '../entities/items';
import { Repository } from 'typeorm';
import { Categories } from '../entities/Categories';

@Injectable()
export class ItemRepository {
    constructor(
        @InjectRepository(Items) private itemRepository: Repository<Items>,
        @InjectRepository(Categories) private categoryRepository: Repository<Categories>,
    ) {}

    async findItemListByCategoryId(categoryId: number) {
        return await this.itemRepository.find({ CategoryId: categoryId });
    }

    async createItem({ CategoryId, name, link }: { CategoryId: number; name: string; link: string }) {
        const newItem = this.itemRepository.create();
        newItem.name = name;
        newItem.link = link;
        newItem.CategoryId = CategoryId;
        return await this.itemRepository.save(newItem);
    }

    async deleteItem(itemId: number) {
        return await this.itemRepository.delete({ id: itemId });
    }

    async findCategoryList() {
        return await this.categoryRepository.find({});
    }
}
