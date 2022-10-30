import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { User } from '../common/decorator/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('bucket')
export class BucketController {
    constructor(private bucketService: BucketService) {}

    @ApiOperation({ summary: '장바구니 등록하기' })
    @ApiBearerAuth('access-token')
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createBucket(@Body() body, @User() user) {
        return await this.bucketService.createBucket(body, user);
    }

    @ApiOperation({ summary: '장바구니 불러오기' })
    @ApiBearerAuth('access-token')
    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getBucket(@User() user) {
        return await this.bucketService.getBucket(user);
    }

    @ApiOperation({ summary: '장바구니 삭제' })
    @ApiBearerAuth('access-token')
    @Delete()
    @UseGuards(AuthGuard('jwt'))
    async deleteBucket(@Body() body, @User() user) {
        return await this.bucketService.deleteBucket(body, user);
    }

    @ApiOperation({ summary: '장바구니 알람주기 변경' })
    @ApiBearerAuth('access-token')
    @Put()
    @UseGuards(AuthGuard('jwt'))
    async updateBucket(@Body() body, @User() user) {
        return await this.bucketService.updateBucket(body, user);
    }
}
