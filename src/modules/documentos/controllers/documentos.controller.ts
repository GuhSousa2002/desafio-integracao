import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { CreateDocumentoDto } from '../dto/create-documento.dto';
import { DocumentosService } from '../services/documentos.service';

@Controller('documentos')
export class DocumentosController {
  constructor(

    private readonly documentosService: DocumentosService,
  ) { }

  @Post()
  async create(@Body() createDocumentoDto: CreateDocumentoDto) {
    return this.documentosService.receberDocumento(createDocumentoDto);
  }


  @Get(':codigoPedido')
  async findByCodigoPedido(
    @Param('codigoPedido', ParseIntPipe) codigoPedido: number,
  ) {
    return this.documentosService.buscarPorCodigoPedido(codigoPedido);
  }
}