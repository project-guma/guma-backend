import { Injectable } from '@nestjs/common';
import cron from 'node-cron';
import { InjectRepository } from '@nestjs/typeorm';
import { Alarm } from './entities/alarm';
import { Repository } from 'typeorm';
import { Temporal } from '@js-temporal/polyfill';
import { naverApi } from './common/utils/naver.api';
import { Items } from './entities/items';

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(Alarm) private alarmRepository: Repository<Alarm>,
        @InjectRepository(Items) private itemRepository: Repository<Items>,
    ) {}

    async getAlarmDate() {
        return Temporal.Now.plainDateISO();
    }

    async getItemByToday(today) {
        const result = await this.itemRepository
            .createQueryBuilder('i')
            .innerJoin('i.SubscribeList', 'sl')
            .innerJoin('sl.Alarm', 'a')
            .where('a.date =:today', { today })
            .getRawMany();

        return result;
    }

    async updateItemByItemList(itemList) {
        for (let i = 0; i < itemList.length; i++) {
            const name = itemList[i]['name'];

            const shoppingData = await naverApi(name);
            const isItem = await this.itemRepository.findOne({ name: name });
            isItem.link = shoppingData['items'][0]['link'];
            isItem.price = shoppingData['items'][0]['lprice'];
            isItem.title = shoppingData['items'][0]['title'];
            isItem.image = shoppingData['items'][0]['image'];
            await this.itemRepository.save(isItem);
        }
    }

    itemUpdateCron() {
        cron.schedule('* * * * * 0-7', async () => {
            const today = await this.getAlarmDate();
            const itemList = await this.getItemByToday(today);
            return await this.updateItemByItemList(itemList);
        });
        return;
    }
}
