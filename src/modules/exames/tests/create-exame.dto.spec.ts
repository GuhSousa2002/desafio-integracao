import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateExameDto } from '../dto/create-exame.dto';

describe('CreateExameDto', () => {
  it('deve validar um payload correto', async () => {
    const dto = plainToInstance(CreateExameDto, {
      accessionNumber: 'ACC-9001',
      nomePaciente: 'Maria Souza',
      modalidade: 'CR',
      status: 'NOVO',
    });

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('deve falhar quando accessionNumber estiver vazio', async () => {
    const dto = plainToInstance(CreateExameDto, {
      accessionNumber: '',
      nomePaciente: 'Maria Souza',
      modalidade: 'CR',
      status: 'NOVO',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('deve falhar quando nomePaciente estiver vazio', async () => {
    const dto = plainToInstance(CreateExameDto, {
      accessionNumber: 'ACC-9001',
      nomePaciente: '',
      modalidade: 'CR',
      status: 'NOVO',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('deve falhar quando modalidade estiver vazia', async () => {
    const dto = plainToInstance(CreateExameDto, {
      accessionNumber: 'ACC-9001',
      nomePaciente: 'Maria Souza',
      modalidade: '',
      status: 'NOVO',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('deve falhar quando status estiver vazio', async () => {
    const dto = plainToInstance(CreateExameDto, {
      accessionNumber: 'ACC-9001',
      nomePaciente: 'Maria Souza',
      modalidade: 'CR',
      status: '',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });
});