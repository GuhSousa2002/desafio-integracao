import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PedidoExameItemDto {
  @IsInt()
  codigoItemPedido: number;

  @IsString()
  @IsNotEmpty()
  accessionNumber: string;

  @IsString()
  @IsNotEmpty()
  modalidade: string;

  @IsString()
  @IsNotEmpty()
  nomeProcedimento: string;
}

export class CreatePedidoDto {
  @IsInt()
  codigoPedido: number;

  @IsString()
  @IsNotEmpty()
  nomePaciente: string;

  @IsString()
  @Matches(/^\d{8}$/, {
    message: 'dataNascimento deve estar no formato YYYYMMDD',
  })
  dataNascimento: string;

  @IsString()
  @IsNotEmpty()
  sexo: string;

  @IsInt()
  codUnidade: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PedidoExameItemDto)
  exames: PedidoExameItemDto[];
}
