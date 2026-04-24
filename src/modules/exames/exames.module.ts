import { Module } from '@nestjs/common';
import { ExamesController } from './controllers/exames.controller';
import { ExamesRepository } from './repositories/exames.repository';
import { ExamesService } from './services/exames.service';

@Module({
  controllers: [ExamesController],
  providers: [ExamesService, ExamesRepository],
  exports: [ExamesService],
})
export class ExamesModule {}
