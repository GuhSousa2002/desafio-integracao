import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PedidosModule } from './models/pedidos/pedidos.module';
import { DocumentosModule } from './models/documentos/documentos.module';
import { ExamesModule } from './models/exames/exames.module';
import { IntegracaoModule } from './models/integracao/integracao.module';

@Module({
  imports: [PedidosModule, DocumentosModule, ExamesModule, IntegracaoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
