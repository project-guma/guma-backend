import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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
        await this.itemService.getItemListByCategory(param);
    }
}
