import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorator/user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('sign')
    @UseGuards(AuthGuard('jwt'))
    async createUser(@Body() body: CreateUserDto, @User() user) {
        return await this.userService.createUser(body, user);
    }
}
