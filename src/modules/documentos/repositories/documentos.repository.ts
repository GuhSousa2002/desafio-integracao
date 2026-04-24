import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Documento,
  DocumentoDocument,
} from '../schemas/documento.schema';

@Injectable()
export class DocumentosRepository {
  constructor(

    @InjectModel(Documento.name)
    private readonly documentoModel: Model<DocumentoDocument>,
  ) { }


  async create(data: Partial<Documento>): Promise<DocumentoDocument> {
    return this.documentoModel.create(data);
  }

  async findByCodigoPedidoAndCodigoDocumento(
    codigoPedido: number,
    codigoDocumento: number,
  ): Promise<DocumentoDocument | null> {
    return this.documentoModel
      .findOne({
        codigoPedido,
        codigoDocumento,
      })
      .exec();
  }


  async findByCodigoPedido(
    codigoPedido: number,
  ): Promise<DocumentoDocument[]> {
    return this.documentoModel.find({ codigoPedido }).exec();
  }


  async findPendentesByCodigoPedido(
    codigoPedido: number,
  ): Promise<DocumentoDocument[]> {
    return this.documentoModel
      .find({
        codigoPedido,
        integrado: false,
      })
      .exec();
  }

  async save(documento: DocumentoDocument): Promise<DocumentoDocument> {
    return documento.save();
  }

  async findAll(): Promise<DocumentoDocument[]> {
    return this.documentoModel.find().exec();
  }

  async deleteAll(): Promise<void> {
    await this.documentoModel.deleteMany({});
  }
}