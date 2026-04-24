import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { PedidoSchema } from '../schemas/pedido.schema';

@Injectable()
export class PedidosRepository {
  private readonly pedidos: PedidoSchema[] = [];

  create(createPedidoDto: CreatePedidoDto): PedidoSchema {
    const pedido: PedidoSchema = {
      id: `${this.pedidos.length + 1}`,
      numero: createPedidoDto.numero,
      situacao: 'aberto',
    };

    this.pedidos.push(pedido);

    return pedido;
  }

  findAll(): PedidoSchema[] {
    return this.pedidos;
  }
}
