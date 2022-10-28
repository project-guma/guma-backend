import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './user';
import { SubscribeList } from './subscribeList';

@Entity('alarm')
export class Alarm {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'date' })
    date: string;

    @Column('int', { name: 'SubscribeListId' })
    SubscribeListId: number;

    @ManyToOne(() => SubscribeList, subscribeList => subscribeList.Alarm, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'SubscribeListId', referencedColumnName: 'id' }])
    SubscribeList: SubscribeList;
}
