import { Injectable } from '@nestjs/common';
import { CreateIntegracaoDto } from '../dto/create-integracao.dto';
import { IntegracaoRepository } from '../repositories/integracao.repository';
import { IntegracaoSchema } from '../schemas/integracao.schema';

@Injectable()
export class IntegracaoService {
  constructor(
    private readonly integracaoRepository: IntegracaoRepository,
  ) {}

  create(createIntegracaoDto: CreateIntegracaoDto): IntegracaoSchema {
    return this.integracaoRepository.create(createIntegracaoDto);
  }

  findAll(): IntegracaoSchema[] {
    return this.integracaoRepository.findAll();
  }
}
