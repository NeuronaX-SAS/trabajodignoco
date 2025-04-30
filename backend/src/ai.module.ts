import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';

@Module({
  imports: [ConfigModule], // Import ConfigModule
  providers: [AiService],
  exports: [AiService],
  controllers: [AiController], // Export AiService
})
export class AiModule {}
