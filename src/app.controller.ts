import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { ENV } from './env/model';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService<ENV>,
  ) {}

  @Get('config')
  getConfig(): string {
    const port = this.configService.get('PORT', { infer: true });
    const message = this.appService.getHello();
    return `Port: ${port}, Message: ${message}`;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
