import { Injectable } from '@nestjs/common';
import { CreateDocumentoDto } from '../dto/create-documento.dto';
import { DocumentoSchema } from '../schemas/documento.schema';

@Injectable()
export class DocumentosRepository {
  private readonly documentos: DocumentoSchema[] = [];

  create(createDocumentoDto: CreateDocumentoDto): DocumentoSchema {
    const documento: DocumentoSchema = {
      id: `${this.documentos.length + 1}`,
      titulo: createDocumentoDto.titulo,
      criadoEm: new Date(),
    };

    this.documentos.push(documento);

    return documento;
  }

  findAll(): DocumentoSchema[] {
    return this.documentos;
  }
}
