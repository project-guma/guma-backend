import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscribeList } from '../entities/subscribeList';
import { Repository } from 'typeorm';
import { CreateSubscribeDto } from './dto/CreateSubscribeDto';
import { UpdateSubscribeDto } from './dto/UpdateSubscribeDto';

export interface IUpdateSubscribe {
    body?: UpdateSubscribeDto;
    param: { SubscribeId: string };
    user: { id: number };
}

@Injectable()
export class SubscribeService {
    constructor(@InjectRepository(SubscribeList) private subscribeRepository: Repository<SubscribeList>) {}

    async createSubscribe(body: CreateSubscribeDto, user) {
        try {
            const { cycle, ItemId } = body;
            const { id } = user;

            const newSubscribe = this.subscribeRepository.create();
            newSubscribe.cycle = cycle;
            newSubscribe.UserId = id;
            newSubscribe.ItemId = ItemId;
            return await this.subscribeRepository.save(newSubscribe);
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

            const isSubscribe = await this.subscribeRepository.findOne({ ItemId: Number(SubscribeId) });

            if (isSubscribe.UserId !== id) {
                throw new BadRequestException();
            }

            isSubscribe.cycle = cycle;
            return await this.subscribeRepository.save(isSubscribe);
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
}
