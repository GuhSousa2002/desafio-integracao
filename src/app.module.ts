import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PedidosModule } from './modules/pedidos/pedidos.module';
import { DocumentosModule } from './modules/documentos/documentos.module';
import { ExamesModule } from './modules/exames/exames.module';

@Module({
  imports: [PedidosModule, DocumentosModule, ExamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
