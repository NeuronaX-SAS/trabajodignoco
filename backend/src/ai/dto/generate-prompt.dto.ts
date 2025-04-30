import { IsString, IsNotEmpty } from 'class-validator';

export class GeneratePromptDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;
}