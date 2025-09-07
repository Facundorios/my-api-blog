import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';

import { ENV } from './env/model';
import { PostsModule } from './posts/posts.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { AiModule } from './ai/ai.module';

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
      }),
      inject: [ConfigService],
    }),
    // Modules importations
    UsersModule,
    PostsModule,
    CategoryModule,
    AuthModule,
    AiModule,
  ],
})
export class AppModule {}
