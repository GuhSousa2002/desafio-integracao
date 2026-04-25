import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { PedidosService } from '../services/pedidos.service';

@ApiTags('pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  async create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.receberPedido(createPedidoDto);
  }

  @Get('teste')
  teste() {
    return { message: 'hello world' };
  }

  @Get(':codigoPedido')
  async findOne(@Param('codigoPedido', ParseIntPipe) codigoPedido: number) {
    return this.pedidosService.buscarPorCodigoPedido(codigoPedido);
  }
}
