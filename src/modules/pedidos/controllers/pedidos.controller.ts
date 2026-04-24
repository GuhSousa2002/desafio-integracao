import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { PedidosService } from '../services/pedidos.service';

@Controller('pedidos')
export class PedidosController {
  constructor(
    /**
     * Injetamos o service de pedidos.
     * O controller não deve conter regra de negócio.
     * Ele só recebe a requisição, repassa para o service
     * e devolve a resposta.
     */
    private readonly pedidosService: PedidosService,
  ) { }

  /**
   * Endpoint: POST /pedidos
   *
   * Responsável por receber um pedido novo
   * ou atualizar um pedido existente, de acordo com a regra:
   * - se não existir, cria
   * - se existir, adiciona apenas exames novos
   */
  @Post()
  async create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.receberPedido(createPedidoDto);
  }

  /**
   * Endpoint: GET /pedidos/:codigoPedido
   *
   * Busca um pedido específico pelo código.
   *
   * O ParseIntPipe garante que o parâmetro recebido
   * na URL seja convertido para número.
   *
   * Exemplo:
   * GET /pedidos/616
   */
  @Get(':codigoPedido')
  async findOne(
    @Param('codigoPedido', ParseIntPipe) codigoPedido: number,
  ) {
    return this.pedidosService.buscarPorCodigoPedido(codigoPedido);
  }
}