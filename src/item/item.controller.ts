import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('item')
export class ItemController {
    constructor(private itemService: ItemService) {}

    @ApiOperation({ summary: '특정 카테고리 상품 리스트 불러오기' })
    @ApiBearerAuth('access-token')
    @Get(':CategoryId')
    @UseGuards(AuthGuard('jwt'))
    async getItemListByCategory(@Param() param) {
        return await this.itemService.getItemListByCategory(param);
    }

    @ApiOperation({ summary: '상품 등록하기.. 이건 어떻게 해야할지 모르겠음. 어드민페이지에서 사용해야하나?' })
    @Post()
    async addItem(@Body() body) {
        return await this.itemService.addItem(body);
    }

    @Delete(':ItemId')
    async deleteItem(@Param() param) {
        return await this.itemService.deleteItem(param);
    }

    @Get('category/list')
    async getCategoryList() {
        return await this.itemService.getCategoryList();
    }
}
