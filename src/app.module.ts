import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Oauth } from './entities/oauth';
import { UserModule } from './user/user.module';
import { Users } from './entities/user';
import { Bucket } from './entities/Bucket';
import { Categories } from './entities/Categories';
import { Items } from './entities/items';
import { SubscribeList } from './entities/subscribeList';
import { SubscribeModule } from './subscribe/subscribe.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    type: 'mysql',
                    host: 'localhost',
                    port: 3306,
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    entities: [Oauth, Users, Bucket, Categories, Items, SubscribeList],
                    autoLoadEntities: true,
                    charset: 'utf8mb4',
                    synchronize: true,
                    logging: true, // query 날리는것 로깅
                    // keepConnectionAlive: true, //hot reloading 할때 필요
                };
            },
        }),
        UserModule,
        SubscribeModule,
    ],

    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
