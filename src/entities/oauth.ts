import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, IsString } from 'class-validator';

@Entity('oauth')
export class Oauth {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @IsEmail()
    @Column('varchar', { name: 'email' })
    email: string;

    @IsString()
    @Column('varchar', { name: 'photo' })
    photo: string;

    @Column('boolean', { name: 'isRegistered' })
    isRegistered: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
