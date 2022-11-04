import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorator/user.decorator';
import { CreateSubscribeDto } from './dto/CreateSubscribeDto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateSubscribeDto } from './dto/UpdateSubscribeDto';

@ApiTags('Subscribe')
@Controller('subscribe')
export class SubscribeController {
    constructor(private subscribeService: SubscribeService) {}

    @ApiOperation({ summary: '구독 리스트 추가' })
    @ApiBearerAuth('access-token')
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createSubscribe(@Body() body: CreateSubscribeDto, @User() user) {
        return await this.subscribeService.createSubscribe(body, user);
    }

    @ApiOperation({ summary: '구독 주기 변경' })
    @ApiBearerAuth('access-token')
    @Put(':SubscribeId')
    @UseGuards(AuthGuard('jwt'))
    async updateSubscribe(@Body() body: UpdateSubscribeDto, @Param() param, @User() user) {
        return await this.subscribeService.updateSubscribe({ body, param, user });
    }

    @ApiOperation({ summary: '구독 리스트 삭제' })
    @ApiBearerAuth('access-token')
    @Delete(':SubscribeId')
    @UseGuards(AuthGuard('jwt'))
    async deleteSubscribe(@Param() param, @User() user) {
        return await this.subscribeService.deleteSubscribe({ param, user });
    }

    @ApiOperation({ summary: '구독 리스트 불러오기' })
    @ApiBearerAuth('access-token')
    @Get('list')
    @UseGuards(AuthGuard('jwt'))
    async getSubscribeList(@User() user) {
        return await this.subscribeService.getSubscribeList(user);
    }

    @Get('onboard')
    @UseGuards(AuthGuard('jwt'))
    async getOnboardItem() {}
}
