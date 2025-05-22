import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';
import { AuthModule } from './auth.module';
import { AuthController } from './auth.controller';
// import { AiModule } from './ai.module'; // AI module disabled as per requirements

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available globally
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule here to inject ConfigService
      inject: [ConfigService], // Inject ConfigService
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User],
        synchronize: true, // Development only - set to false in production
      }),
    }),
    UsersModule,
    AuthModule,
    // AiModule, // AI module disabled as per requirements
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
