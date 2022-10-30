import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bucket } from '../entities/Bucket';
import { Repository } from 'typeorm';
import { Items } from '../entities/items';
import { Temporal } from '@js-temporal/polyfill';

@Injectable()
export class BucketService {
    constructor(
        @InjectRepository(Bucket) private bucketRepository: Repository<Bucket>,
        @InjectRepository(Items) private itemRepository: Repository<Items>,
    ) {}

    async createBucket(body, user) {
        const { ItemId, cycle } = body;
        const { id } = user;

        const newBucket = this.bucketRepository.create();
        newBucket.UserId = id;
        newBucket.cycle = cycle;
        newBucket.ItemId = ItemId;
        return await this.bucketRepository.save(newBucket);
    }

    async getBucket(user) {
        const { id } = user;

        return await this.itemRepository
            .createQueryBuilder('i')
            .innerJoin('i.Bucket', 'b')
            .where('b.UserId =:id', { id })
            .getRawMany();
    }

    async deleteBucket(body, user) {
        const { BucketId } = body;
        const { id } = user;

        return await this.bucketRepository.delete({ id: BucketId, UserId: id });
    }

    async updateBucket(body, user) {
        const { cycle, BucketId } = body;
        const { id } = user;

        const isSubscribe = await this.bucketRepository.findOne({ id: BucketId, UserId: id });

        if (isSubscribe.UserId !== id) {
            throw new BadRequestException();
        }

        isSubscribe.cycle = cycle;
        return await this.bucketRepository.save(isSubscribe);
    }
}
