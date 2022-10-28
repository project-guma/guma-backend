import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bucket } from '../entities/Bucket';
import { Repository } from 'typeorm';
import { Items } from '../entities/items';

@Injectable()
export class BucketService {
    constructor(
        @InjectRepository(Bucket) private bucketRepository: Repository<Bucket>,
        @InjectRepository(Items) private itemRepository: Repository<Items>,
    ) {}

    async createBucket(body, user) {
        const { ItemId } = body;
        const { id } = user;

        const newBucket = this.bucketRepository.create();
        newBucket.UserId = id;
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
}
