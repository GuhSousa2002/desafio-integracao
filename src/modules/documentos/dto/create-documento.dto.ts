import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDocumentoDto {
  @ApiProperty({ example: 251 })
  @IsInt()
  codigoDocumento: number;

  @ApiProperty({ example: 616 })
  @IsInt()
  codigoPedido: number;

  @ApiProperty({ example: 'PEDIDO' })
  @IsString()
  @IsNotEmpty()
  nomeDocumento: string;

  @ApiProperty({ example: 'base64-teste' })
  @IsString()
  @IsNotEmpty()
  documento: string;
}
