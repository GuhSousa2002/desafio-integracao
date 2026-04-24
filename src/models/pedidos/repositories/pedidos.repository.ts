import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pedido, PedidoDocument } from '../schemas/pedido.schema';

@Injectable()
export class PedidosRepository {
  constructor(

    @InjectModel(Pedido.name)
    private readonly pedidoModel: Model<PedidoDocument>,
  ) { }


  async create(data: Partial<Pedido>): Promise<PedidoDocument> {
    return this.pedidoModel.create(data);
  }

  async findByCodigoPedido(
    codigoPedido: number,
  ): Promise<PedidoDocument | null> {
    return this.pedidoModel.findOne({ codigoPedido }).exec();
  }


  async findByAccessionNumber(
    accessionNumber: string,
  ): Promise<PedidoDocument | null> {
    return this.pedidoModel
      .findOne({
        'exames.accessionNumber': accessionNumber,
      })
      .exec();
  }


  async save(pedido: PedidoDocument): Promise<PedidoDocument> {
    return pedido.save();
  }


  async findAll(): Promise<PedidoDocument[]> {
    return this.pedidoModel.find().exec();
  }


  async deleteAll(): Promise<void> {
    await this.pedidoModel.deleteMany({});
  }
}