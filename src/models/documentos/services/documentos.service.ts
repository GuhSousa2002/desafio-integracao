import { Injectable } from '@nestjs/common';
import { CreateDocumentoDto } from '../dto/create-documento.dto';
import { DocumentosRepository } from '../repositories/documentos.repository';
import { DocumentoSchema } from '../schemas/documento.schema';

@Injectable()
export class DocumentosService {
  constructor(
    private readonly documentosRepository: DocumentosRepository,
  ) {}

  create(createDocumentoDto: CreateDocumentoDto): DocumentoSchema {
    return this.documentosRepository.create(createDocumentoDto);
  }

  findAll(): DocumentoSchema[] {
    return this.documentosRepository.findAll();
  }
}
