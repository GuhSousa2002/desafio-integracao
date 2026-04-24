import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { PedidosRepository } from '../repositories/pedidos.repository';
import { PedidoSchema } from '../schemas/pedido.schema';

@Injectable()
export class PedidosService {
  constructor(private readonly pedidosRepository: PedidosRepository) {}

  create(createPedidoDto: CreatePedidoDto): PedidoSchema {
    return this.pedidosRepository.create(createPedidoDto);
  }

  findAll(): PedidoSchema[] {
    return this.pedidosRepository.findAll();
  }
}
