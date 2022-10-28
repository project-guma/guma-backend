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
export class SubscribeService {
    constructor(
        @InjectRepository(SubscribeList) private subscribeRepository: Repository<SubscribeList>,
        @InjectRepository(Alarm) private alarmRepository: Repository<Alarm>,
    ) {}

    async createSubscribe(body: CreateSubscribeDto, user) {
        try {
            const { cycle, ItemId } = body;
            const { id } = user;

            let now = Temporal.Now.plainDateISO();
            now = now.add({ days: cycle });

            const newSubscribe = this.subscribeRepository.create();
            newSubscribe.cycle = cycle;
            newSubscribe.UserId = id;
            newSubscribe.ItemId = ItemId;
            const returned = await this.subscribeRepository.save(newSubscribe);

            const newAlarm = this.alarmRepository.create();
            newAlarm.date = now.toString();
            newAlarm.SubscribeListId = returned.id;
            return await this.alarmRepository.save(newAlarm);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateSubscribe({ body, param, user }: IUpdateSubscribe) {
        try {
            const { cycle } = body;
            const { SubscribeId } = param;
            const { id } = user;

            let now = Temporal.Now.plainDateISO();
            now = now.add({ days: cycle });

            const isSubscribe = await this.subscribeRepository.findOne({ id: Number(SubscribeId) });

            if (isSubscribe.UserId !== id) {
                throw new BadRequestException();
            }

            isSubscribe.cycle = cycle;
            await this.subscribeRepository.save(isSubscribe);

            const isAlarm = await this.alarmRepository.findOne({ SubscribeListId: Number(SubscribeId) });
            isAlarm.date = now.toString();
            return await this.alarmRepository.save(isAlarm);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteSubscribe({ param, user }: IUpdateSubscribe) {
        try {
            const { SubscribeId } = param;
            const { id } = user;

            const isSubscribe = await this.subscribeRepository.findOne({ ItemId: Number(SubscribeId) });

            if (isSubscribe.UserId !== id) {
                throw new BadRequestException();
            }

            return await this.subscribeRepository.delete({ ItemId: Number(SubscribeId) });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getSubscribeList(user: { id: number }) {
        try {
            const { id } = user;
            return await this.subscribeRepository.find({ UserId: id });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
