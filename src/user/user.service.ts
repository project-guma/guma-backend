import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { Users } from '../entities/user';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(Users) private userRepository: Repository<Users>) {}

    async createUser(body: CreateUserDto, user) {
        const { nickname, image } = body;
        const { id } = user;
        const newUser = this.userRepository.create();

        newUser.nickname = nickname;
        newUser.image = image;
        newUser.OauthId = id;
        return await this.userRepository.save(newUser);
    }
}
