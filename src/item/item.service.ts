import { Injectable } from '@nestjs/common';

import { ItemRepository } from './item.repository';

@Injectable()
export class ItemService {
    constructor(private itemRepository: ItemRepository) {}

    async getItemListByCategory(param) {
        const categoryId = Number(param.CategoryId);
        return await this.itemRepository.findItemListByCategoryId(categoryId);
    }

    async addItem(body) {
        const { CategoryId, name, link } = body;
        return await this.itemRepository.createItem({ CategoryId, name, link });
    }

    async deleteItem(param) {
        const itemId = Number(param.ItemId);

        return await this.itemRepository.deleteItem(itemId);
    }

    async getCategoryList() {
        return await this.itemRepository.findCategoryList();
    }
}
