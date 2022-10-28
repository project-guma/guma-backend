import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    // @Get()
    // getHello(): string {
    //     return this.appService.getHello();
    // }

    @Get()
    @Render('index')
    getHellos(@Res() res: Response) {
        const google = process.env.OAUTH_GOOGLE_URL as string;
        const kakao = process.env.OAUTH_KAKAO_URL as string;
        return {
            google: google,
            kakao: kakao,
        };
    }
}
