import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DocumentoDocument = HydratedDocument<Documento>;

@Schema({
  timestamps: true,
  collection: 'documentos',
})
export class Documento {
  @Prop({ required: true })
  codigoDocumento: number;

  @Prop({ required: true, index: true })
  codigoPedido: number;

  @Prop({ required: true, trim: true })
  nomeDocumento: string;

  @Prop({ required: true })
  documento: string;

  @Prop({ default: false })
  integrado: boolean;
}

export const DocumentoSchema = SchemaFactory.createForClass(Documento);

DocumentoSchema.index(
  { codigoPedido: 1, codigoDocumento: 1 },
  { unique: true },
);
