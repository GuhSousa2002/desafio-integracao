import { Module } from '@nestjs/common';
import { IntegracaoController } from './controllers/integracao.controller';
import { IntegracaoRepository } from './repositories/integracao.repository';
import { IntegracaoService } from './services/integracao.service';

@Module({
  controllers: [IntegracaoController],
  providers: [IntegracaoService, IntegracaoRepository],
  exports: [IntegracaoService],
})
export class IntegracaoModule {}
