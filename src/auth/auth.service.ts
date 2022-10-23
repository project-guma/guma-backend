import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/auth/dto/CreateUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Oauth } from '../entities/oauth';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(Oauth) private oauthRepository: Repository<Oauth>, private jwtService: JwtService) {}

    async signWithGoogle(user) {
        if (!user) throw new BadRequestException();

        try {
            console.log('Login User email :  ', user.email);
            const newUser: CreateUserDto = {
                email: user.email,
                photo: user.photos,
                accessToken: user.accessToken,
            };

            const isOauth = await this.getOauth(user.email);

            if (!isOauth) {
                const isRegistered = false;
                const newOauth = await this.createOauth(newUser, isRegistered);
                return await this.login(newUser, newOauth);
            } else {
                return await this.login(newUser, isOauth);
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    async getOauth(email) {
        return await this.oauthRepository.findOne({ email: email });
    }

    async createOauth(newUser, isRegistered) {
        const newOauth = this.oauthRepository.create();
        newOauth.email = newUser.email;
        newOauth.photo = newUser.photo;
        newOauth.isRegistered = isRegistered;
        return await this.oauthRepository.save(newOauth);
    }

    async login(user, oauth) {
        if (!user) throw new BadRequestException();

        return {
            accessToken: this.jwtService.sign(
                {
                    id: user.id,
                },
                {
                    secret: process.env.JWT_SECRET,
                    expiresIn: process.env.JWT_EXPIRE_TIME,
                },
            ),

            email: user.email,
            photo: user.photo,
            isRegistered: oauth.isRegistered,
        };
    }
}
