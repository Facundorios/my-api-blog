import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

import { ENV } from 'src/env/model';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor(private readonly configService: ConfigService<ENV>) {
    const apiKey = this.configService.get('GEMINI_API_KEY', { infer: true });
    if (!apiKey) throw new BadRequestException('GEMINI_API_KEY not found');
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateSummary(content: string): Promise<string> {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const prompt = `Genera un resumen para la siguiente publicación de blog. El resumen debe tener 200 caracteres o menos.

    Contenido:
    ${content}
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating summary:', error);
      throw new BadGatewayException('Failed to generate summary');
    }
  }

  // La API de Gemini no tiene una funcionalidad nativa para generar imágenes a partir de texto
  // de la misma manera que DALL-E 3. Por lo tanto, esta función no se puede replicar directamente.
  // Podrías usar otra API de terceros para la generación de imágenes.

  // async generateImage(text: string) {
  //  // Funcionalidad no disponible con la API de Gemini
  //  throw new BadRequestException('Gemini API does not support image generation.');
  // }
}
