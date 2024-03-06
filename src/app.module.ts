import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configurationMongo from './configuration/configuration-mongo';
import { UsersModule } from './apps/users/users.module';
import { AuthModule } from './apps/auth/auth.module';
import configurationAuth from './configuration/configuration-auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurationMongo, configurationAuth],
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
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
