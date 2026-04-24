import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDocumentoDto {
  @IsInt()
  codigoDocumento: number;

  @IsInt()
  codigoPedido: number;

  @IsString()
  @IsNotEmpty()
  nomeDocumento: string;

  @IsString()
  @IsNotEmpty()
  documento: string;
}