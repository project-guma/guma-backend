import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const config = new DocumentBuilder()
        .setTitle('GUMA API')
        .setDescription('GUMA API Document 입니다. JWT 토큰은 임의로 발급받은 후 우측에 있는 Authorize 에 등록해주세요.')
        .setVersion('1.0')

        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                name: 'JWT',
                in: 'header',
            },
            'access-token',
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    await app.listen(3000);
}
bootstrap();
