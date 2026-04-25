import { forwardRef, Module } from '@nestjs/common';
import { DocumentosController } from './controllers/documentos.controller';
import { DocumentosRepository } from './repositories/documentos.repository';
import { DocumentosService } from './services/documentos.service';
import { PedidosModule } from '../pedidos/pedidos.module';
import { ExamesModule } from '../exames/exames.module';
import { Documento, DocumentoSchema } from './schemas/documento.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    forwardRef(() => PedidosModule),
    forwardRef(() => ExamesModule),
    MongooseModule.forFeature([
      { name: Documento.name, schema: DocumentoSchema },
    ]),
  ],
  controllers: [DocumentosController],
  providers: [DocumentosService, DocumentosRepository],
  exports: [DocumentosService, DocumentosRepository],
})
export class DocumentosModule {}
