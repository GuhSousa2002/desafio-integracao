import { Injectable } from '@nestjs/common';
import { CreateIntegracaoDto } from '../dto/create-integracao.dto';
import { IntegracaoSchema } from '../schemas/integracao.schema';

@Injectable()
export class IntegracaoRepository {
  private readonly integracoes: IntegracaoSchema[] = [];

  create(createIntegracaoDto: CreateIntegracaoDto): IntegracaoSchema {
    const integracao: IntegracaoSchema = {
      id: `${this.integracoes.length + 1}`,
      origem: createIntegracaoDto.origem,
      destino: createIntegracaoDto.destino,
    };

    this.integracoes.push(integracao);

    return integracao;
  }

  findAll(): IntegracaoSchema[] {
    return this.integracoes;
  }
}
