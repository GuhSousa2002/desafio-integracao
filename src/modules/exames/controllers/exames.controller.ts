import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { CreateExameDto } from '../dto/create-exame.dto';
import { ExamesService } from '../services/exames.service';

@Controller('exames')
export class ExamesController {
  constructor(

    private readonly examesService: ExamesService,
  ) { }


  @Post()
  async create(@Body() createExameDto: CreateExameDto) {
    return this.examesService.receberExame(createExameDto);
  }

  @Get(':accessionNumber')
  async findByAccessionNumber(
    @Param('accessionNumber') accessionNumber: string,
  ) {
    return this.examesService.buscarPorAccessionNumber(accessionNumber);
  }
}