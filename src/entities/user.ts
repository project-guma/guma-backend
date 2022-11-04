import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Oauth } from './oauth';
import { SubscribeList } from './subscribeList';
import { Bucket } from './Bucket';

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'nickname' })
    nickname: string;

    @Column('varchar', { name: 'image' })
    image: string;

    @CreateDateColumn()
    createdAt: Date;
    d;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => SubscribeList, subscribeList => subscribeList.User)
    SubscribeList: SubscribeList[];

    @OneToMany(() => Bucket, bucket => bucket.User)
    Bucket: Bucket[];

    @Column('int', { name: 'OauthId' })
    OauthId: number;

    @ManyToOne(() => Oauth, oauth => oauth.Users, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'OauthId', referencedColumnName: 'id' }])
    Oauth: Oauth;
}
