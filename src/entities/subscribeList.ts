import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Users } from './user';
import { Items } from './items';

@Entity('subscribeList')
export class SubscribeList {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'cycle' })
    cycle: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column('int', { name: 'UserId' })
    UserId: number;

    @ManyToOne(() => Users, user => user.SubscribeList, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
    User: Users;

    @Column('int', { name: 'ItemId' })
    ItemId: number;

    @ManyToOne(() => Items, item => item.SubscribeList, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'ItemId', referencedColumnName: 'id' }])
    Item: Items;
}
