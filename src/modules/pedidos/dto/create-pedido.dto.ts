import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class PedidoExameItemDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  codigoItemPedido: number;

  @ApiProperty({ example: 'ACC-9001' })
  @IsString()
  @IsNotEmpty()
  accessionNumber: string;

  @ApiProperty({ example: 'CR' })
  @IsString()
  @IsNotEmpty()
  modalidade: string;

  @ApiProperty({ example: 'RX Torax' })
  @IsString()
  @IsNotEmpty()
  nomeProcedimento: string;
}

export class CreatePedidoDto {
  @ApiProperty({ example: 616 })
  @IsInt()
  codigoPedido: number;

  @ApiProperty({ example: 'Maria Souza' })
  @IsString()
  @IsNotEmpty()
  nomePaciente: string;

  @ApiProperty({ example: '19920814' })
  @IsString()
  @Matches(/^\d{8}$/, {
    message: 'dataNascimento deve estar no formato YYYYMMDD',
  })
  dataNascimento: string;

  @ApiProperty({ example: 'F' })
  @IsString()
  @IsNotEmpty()
  sexo: string;

  @ApiProperty({ example: 12 })
  @IsInt()
  codUnidade: number;

  @ApiProperty({ type: [PedidoExameItemDto] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PedidoExameItemDto)
  exames: PedidoExameItemDto[];
}
