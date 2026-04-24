import { Injectable } from '@nestjs/common';
import { CreateExameDto } from '../dto/create-exame.dto';
import { ExamesRepository } from '../repositories/exames.repository';
import { ExameSchema } from '../schemas/exame.schema';

@Injectable()
export class ExamesService {
  constructor(private readonly examesRepository: ExamesRepository) {}

  create(createExameDto: CreateExameDto): ExameSchema {
    return this.examesRepository.create(createExameDto);
  }

  findAll(): ExameSchema[] {
    return this.examesRepository.findAll();
  }
}
