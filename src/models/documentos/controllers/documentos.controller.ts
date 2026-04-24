import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDocumentoDto } from '../dto/create-documento.dto';
import { DocumentoSchema } from '../schemas/documento.schema';
import { DocumentosService } from '../services/documentos.service';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Post()
  create(@Body() createDocumentoDto: CreateDocumentoDto): DocumentoSchema {
    return this.documentosService.create(createDocumentoDto);
  }

  @Get()
  findAll(): DocumentoSchema[] {
    return this.documentosService.findAll();
  }
}
