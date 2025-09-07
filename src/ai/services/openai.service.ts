import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { OpenAI } from 'openai';
import { ENV } from 'src/env/model';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor(private readonly configService: ConfigService<ENV>) {
    const apiKey = this.configService.get('OPENAI_API_KEY', { infer: true });
    if (!apiKey) throw new BadRequestException();
    this.openai = new OpenAI({ apiKey });
  }

  async generateSummary(content: string) {
    const response = await this.openai.responses.create({
      model: 'gpt-4o-mini',
      instructions:
        'You are a helpful assistant that generates summaries for blog posts. You should generate summaries with 200 characters or less.',
      input: content,
    });

    return response.output_text;
  }

  async generateImage(text: string) {
    const prompt = `Generate a image for a vlog post about ${text}`;
    const response = await this.openai.images.generate({
      model: 'dall-e-3',
      response_format: 'url',
      prompt,
    });
    if (!response.data?.[0]?.url) {
      throw new BadRequestException('Failed to generate image');
    }
    return response.data?.[0]?.url;
  }
}
