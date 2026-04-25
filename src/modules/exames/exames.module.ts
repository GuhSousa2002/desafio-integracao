import { forwardRef, Module } from '@nestjs/common';
import { ExamesController } from './controllers/exames.controller';
import { ExamesRepository } from './repositories/exames.repository';
import { ExamesService } from './services/exames.service';
import { PedidosModule } from '../pedidos/pedidos.module';
import { DocumentosModule } from '../documentos/documentos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Exame, ExameSchema } from './schemas/exame.schema';

@Module({
  imports: [
    forwardRef(() => PedidosModule),
    forwardRef(() => DocumentosModule),
    MongooseModule.forFeature([{ name: Exame.name, schema: ExameSchema }]),
  ],
  controllers: [ExamesController],
  providers: [ExamesService, ExamesRepository],
  exports: [ExamesService, ExamesRepository],
})
export class ExamesModule {}
