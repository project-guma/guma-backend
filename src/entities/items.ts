import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SubscribeList } from './subscribeList';
import { Categories } from './Categories';
import { Bucket } from './Bucket';

@Entity('item')
export class Items {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'name' })
    name: string;

    @Column('varchar', { name: 'link' })
    link: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => SubscribeList, subscribeList => subscribeList.Item)
    SubscribeList: SubscribeList[];

    @OneToMany(() => Bucket, bucket => bucket.Item)
    Bucket: Bucket[];

    @Column('int', { name: 'CategoryId' })
    CategoryId: number;

    @ManyToOne(() => Categories, category => category.Item, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'CategoryId', referencedColumnName: 'id' }])
    Category: Categories;
}
