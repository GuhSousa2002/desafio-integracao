import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateIntegracaoDto } from '../dto/create-integracao.dto';
import { IntegracaoSchema } from '../schemas/integracao.schema';
import { IntegracaoService } from '../services/integracao.service';

@Controller('integracao')
export class IntegracaoController {
  constructor(private readonly integracaoService: IntegracaoService) {}

  @Post()
  create(@Body() createIntegracaoDto: CreateIntegracaoDto): IntegracaoSchema {
    return this.integracaoService.create(createIntegracaoDto);
  }

  @Get()
  findAll(): IntegracaoSchema[] {
    return this.integracaoService.findAll();
  }
}
