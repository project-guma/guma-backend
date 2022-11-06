import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscribeList } from '../entities/subscribeList';
import { Repository } from 'typeorm';
import { CreateSubscribeDto } from './dto/CreateSubscribeDto';
import { UpdateSubscribeDto } from './dto/UpdateSubscribeDto';
import { Alarm } from '../entities/alarm';
import { Temporal } from '@js-temporal/polyfill';

export interface IUpdateSubscribe {
    body?: UpdateSubscribeDto;
    param: { SubscribeId: string };
    user: { id: number };
}

@Injectable()
export class SubscribeRepository {
    constructor(
        @InjectRepository(SubscribeList) private subscribeRepository: Repository<SubscribeList>,
        @InjectRepository(Alarm) private alarmRepository: Repository<Alarm>,
    ) {}

    async createSubscribe({ oauthId, ItemId, cycle }: { oauthId: number; ItemId: number; cycle: number }) {
        const newSubscribe = this.subscribeRepository.create();
        newSubscribe.cycle = cycle;
        newSubscribe.UserId = oauthId;
        newSubscribe.ItemId = ItemId;

        return await this.subscribeRepository.save(newSubscribe);
    }

    async createAlarm({ subscribeId, now }: { subscribeId: number; now: Temporal.PlainDate }) {
        const newAlarm = this.alarmRepository.create();
        newAlarm.date = now.toString();
        newAlarm.SubscribeListId = subscribeId;
        return await this.alarmRepository.save(newAlarm);
    }

    async updateSubscribeAndAlarmBySubscribeId({
        subscribeId,
        oauthId,
        cycle,
        now,
    }: {
        subscribeId: number;
        oauthId: number;
        cycle: number;
        now: Temporal.PlainDate;
    }) {
        const isSubscribe = await this.subscribeRepository.findOne({ id: subscribeId });

        if (isSubscribe.UserId !== oauthId) {
            throw new BadRequestException();
        }

        isSubscribe.cycle = cycle;
        await this.subscribeRepository.save(isSubscribe);

        const isAlarm = await this.alarmRepository.findOne({ SubscribeListId: subscribeId });
        isAlarm.date = now.toString();
        return await this.alarmRepository.save(isAlarm);
    }

    async findSubscribe(subscribeId: number) {
        return await this.subscribeRepository.findOne({ id: subscribeId });
    }

    async deleteSubscribe(subscribeId: number) {
        return await this.subscribeRepository.delete({ id: subscribeId });
    }

    async findSubscribeList(oauthId: number) {
        return await this.subscribeRepository.find({ UserId: oauthId });
    }
}
