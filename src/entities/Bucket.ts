import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Categories } from './Categories';
import { Users } from './user';
import { Items } from './items';

@Entity('bucket')
export class Bucket {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column('int', { name: 'UserId' })
    UserId: number;

    @ManyToOne(() => Users, user => user.Bucket, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
    User: Users;

    @Column('int', { name: 'ItemId' })
    ItemId: number;

    @ManyToOne(() => Items, item => item.Bucket, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'ItemId', referencedColumnName: 'id' }])
    Item: Items;
}
