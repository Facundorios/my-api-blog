import { Module } from '@nestjs/common';

import { OpenaiService } from './services/openai.service';
import { GeminiService } from './services/germini.service';

@Module({
  providers: [OpenaiService, GeminiService],
  exports: [OpenaiService, GeminiService],
})
export class AiModule {}
