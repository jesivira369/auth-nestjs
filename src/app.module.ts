import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configurationMongo from './configuration/configuration-mongo';
import { UsersModule } from './apps/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurationMongo],
      isGlobal: true,
      envFilePath: `.env`,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${encodeURIComponent(configService.get<string>('mongo.user'))}:${encodeURIComponent(configService.get<string>('mongo.password'))}@${configService.get<string>('mongo.host')}:${configService.get<string>('mongo.port')}/${configService.get<string>('mongo.database')}?authSource=admin`,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
