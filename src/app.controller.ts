import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GetFundsReq } from './dto/request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getFund(@Body() input: GetFundsReq) {
    return this.appService.getFund(input);
  }
}
