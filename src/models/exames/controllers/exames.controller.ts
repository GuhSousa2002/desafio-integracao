import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateExameDto } from '../dto/create-exame.dto';
import { ExameSchema } from '../schemas/exame.schema';
import { ExamesService } from '../services/exames.service';

@Controller('exames')
export class ExamesController {
  constructor(private readonly examesService: ExamesService) {}

  @Post()
  create(@Body() createExameDto: CreateExameDto): ExameSchema {
    return this.examesService.create(createExameDto);
  }

  @Get()
  findAll(): ExameSchema[] {
    return this.examesService.findAll();
  }
}
