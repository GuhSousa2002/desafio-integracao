import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExameDocument = HydratedDocument<Exame>;

@Schema({
  timestamps: true,
  collection: 'exames',
})
export class Exame {
  @Prop({ required: true, unique: true, trim: true })
  accessionNumber: string;

  @Prop({ required: true, trim: true })
  nomePaciente: string;

  @Prop({ required: true, trim: true })
  modalidade: string;

  @Prop({ required: true, trim: true })
  status: string;
}

export const ExameSchema = SchemaFactory.createForClass(Exame);
