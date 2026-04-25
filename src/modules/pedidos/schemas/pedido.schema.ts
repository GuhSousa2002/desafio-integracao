import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PedidoDocument = HydratedDocument<Pedido>;

@Schema({ _id: false })
export class PedidoExameItem {
  @Prop({ required: true })
  codigoItemPedido: number;

  @Prop({ required: true, trim: true })
  accessionNumber: string;

  @Prop({ required: true, trim: true })
  modalidade: string;

  @Prop({ required: true, trim: true })
  nomeProcedimento: string;
}

export const PedidoExameItemSchema =
  SchemaFactory.createForClass(PedidoExameItem);

@Schema({
  timestamps: true,
  collection: 'pedidos',
})
export class Pedido {
  @Prop({ required: true, unique: true })
  codigoPedido: number;

  @Prop({ required: true, trim: true })
  nomePaciente: string;

  @Prop({ required: true })
  dataNascimento: string;

  @Prop({ required: true, trim: true })
  sexo: string;

  @Prop({ required: true })
  codUnidade: number;

  @Prop({ default: false })
  integrado: boolean;

  @Prop({ type: [PedidoExameItemSchema], default: [] })
  exames: PedidoExameItem[];
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
