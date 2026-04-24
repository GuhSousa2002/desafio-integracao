import { Module } from '@nestjs/common';
import { PedidosController } from './controllers/pedidos.controller';
import { PedidosRepository } from './repositories/pedidos.repository';
import { PedidosService } from './services/pedidos.service';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService, PedidosRepository],
  exports: [PedidosService],
})
export class PedidosModule {}
