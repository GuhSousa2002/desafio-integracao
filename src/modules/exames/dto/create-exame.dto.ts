import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExameDto {
  @ApiProperty({ example: 'ACC-9001' })
  @IsString()
  @IsNotEmpty()
  accessionNumber: string;

  @ApiProperty({ example: 'Maria Souza' })
  @IsString()
  @IsNotEmpty()
  nomePaciente: string;

  @ApiProperty({ example: 'CR' })
  @IsString()
  @IsNotEmpty()
  modalidade: string;

  @ApiProperty({ example: 'LAUDADO' })
  @IsString()
  @IsNotEmpty()
  status: string;
}
