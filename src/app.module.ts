import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';


import { User } from './users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(
      // { isGlobal: true }
    ),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password:  process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      // process.env.POSTGRES_DB,
      synchronize: true,
      autoLoadEntities: false,

      entities: [User],
    })],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
