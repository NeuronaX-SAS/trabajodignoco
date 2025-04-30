import { Controller, Post, Body, UseGuards, Request, Logger } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { GeneratePromptDto } from './ai/dto/generate-prompt.dto';

@Controller('ai')
export class AiController {
  private readonly logger = new Logger(AiController.name);

  constructor(private readonly aiService: AiService) {}

  @UseGuards(JwtAuthGuard)
  @Post('generate')
  async generate(
    @Body() generatePromptDto: GeneratePromptDto,
    @Request() req: any, // Access validated user via req.user (from JwtStrategy)
  ) {
    this.logger.log(`User ${req.user?.userId} requested AI generation`);
    const response = await this.aiService.generateResponse(generatePromptDto.prompt);
    return { response }; // Wrap in an object for consistent API structure
  }
}
