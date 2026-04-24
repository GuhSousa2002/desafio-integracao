import { Injectable } from '@nestjs/common';
import { CreateExameDto } from '../dto/create-exame.dto';
import { ExameSchema } from '../schemas/exame.schema';

@Injectable()
export class ExamesRepository {
  private readonly exames: ExameSchema[] = [];

  create(createExameDto: CreateExameDto): ExameSchema {
    const exame: ExameSchema = {
      id: `${this.exames.length + 1}`,
      nome: createExameDto.nome,
      status: 'pendente',
    };

    this.exames.push(exame);

    return exame;
  }

  findAll(): ExameSchema[] {
    return this.exames;
  }
}
