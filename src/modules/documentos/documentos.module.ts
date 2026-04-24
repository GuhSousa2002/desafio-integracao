import { Module } from '@nestjs/common';
import { DocumentosController } from './controllers/documentos.controller';
import { DocumentosRepository } from './repositories/documentos.repository';
import { DocumentosService } from './services/documentos.service';

@Module({
  controllers: [DocumentosController],
  providers: [DocumentosService, DocumentosRepository],
  exports: [DocumentosService],
})
export class DocumentosModule {}
