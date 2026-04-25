import { forwardRef, Module } from '@nestjs/common';
import { PedidosController } from './controllers/pedidos.controller';
import { PedidosRepository } from './repositories/pedidos.repository';
import { PedidosService } from './services/pedidos.service';
import { ExamesModule } from '../exames/exames.module';
import { DocumentosModule } from '../documentos/documentos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Pedido, PedidoSchema } from './schemas/pedido.schema';
@Module({
  imports: [
    forwardRef(() => ExamesModule),
    forwardRef(() => DocumentosModule),
    MongooseModule.forFeature([{ name: Pedido.name, schema: PedidoSchema }]),
  ],
  controllers: [PedidosController],
  providers: [PedidosService, PedidosRepository],
  exports: [PedidosService, PedidosRepository],
})
export class PedidosModule {}
