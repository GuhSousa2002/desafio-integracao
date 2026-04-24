import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { PedidoSchema } from '../schemas/pedido.schema';
import { PedidosService } from '../services/pedidos.service';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto): PedidoSchema {
    return this.pedidosService.create(createPedidoDto);
  }

  @Get()
  findAll(): PedidoSchema[] {
    return this.pedidosService.findAll();
  }
}
