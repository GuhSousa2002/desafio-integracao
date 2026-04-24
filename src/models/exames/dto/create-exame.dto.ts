import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExameDto {
  @IsString()
  @IsNotEmpty()
  accessionNumber: string;

  @IsString()
  @IsNotEmpty()
  nomePaciente: string;

  @IsString()
  @IsNotEmpty()
  modalidade: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}