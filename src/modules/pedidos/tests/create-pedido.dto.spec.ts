import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreatePedidoDto } from '../dto/create-pedido.dto';

describe('CreatePedidoDto', () => {
  it('deve validar um payload correto', async () => {
    const dto = plainToInstance(CreatePedidoDto, {
      codigoPedido: 616,
      nomePaciente: 'Maria Souza',
      dataNascimento: '19920814',
      sexo: 'F',
      codUnidade: 12,
      exames: [
        {
          codigoItemPedido: 1,
          accessionNumber: 'ACC-9001',
          modalidade: 'CR',
          nomeProcedimento: 'RX Tórax',
        },
      ],
    });

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('deve falhar quando dataNascimento não estiver no formato YYYYMMDD', async () => {
    const dto = plainToInstance(CreatePedidoDto, {
      codigoPedido: 616,
      nomePaciente: 'Maria Souza',
      dataNascimento: '1992-08-14',
      sexo: 'F',
      codUnidade: 12,
      exames: [
        {
          codigoItemPedido: 1,
          accessionNumber: 'ACC-9001',
          modalidade: 'CR',
          nomeProcedimento: 'RX Tórax',
        },
      ],
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('deve falhar quando exames estiver vazio ou inválido', async () => {
    const dto = plainToInstance(CreatePedidoDto, {
      codigoPedido: 616,
      nomePaciente: 'Maria Souza',
      dataNascimento: '19920814',
      sexo: 'F',
      codUnidade: 12,
      exames: [],
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });
});