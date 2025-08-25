import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';

import { ENV } from './env/model';

@Module({
  imports: [
    // Environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    // Database configuration
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<ENV>) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST', { infer: true }),
        port: configService.get('POSTGRES_PORT', { infer: true }),
        username: configService.get('POSTGRES_USERNAME', { infer: true }),
        password: configService.get('POSTGRES_PASSWORD', { infer: true }),
        database: configService.get('POSTGRES_DATABASE', { infer: true }),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    // Modules importations
    UsersModule,
  ],
})
export class AppModule {}
