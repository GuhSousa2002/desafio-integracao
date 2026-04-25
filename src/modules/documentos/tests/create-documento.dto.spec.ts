import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateDocumentoDto } from '../dto/create-documento.dto';

describe('CreateDocumentoDto', () => {
  it('deve validar um payload correto', async () => {
    const dto = plainToInstance(CreateDocumentoDto, {
      codigoDocumento: 251,
      codigoPedido: 615,
      nomeDocumento: 'PEDIDO',
      documento: 'base64',
    });

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('deve falhar quando nomeDocumento estiver vazio', async () => {
    const dto = plainToInstance(CreateDocumentoDto, {
      codigoDocumento: 251,
      codigoPedido: 615,
      nomeDocumento: '',
      documento: 'base64',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('deve falhar quando documento estiver vazio', async () => {
    const dto = plainToInstance(CreateDocumentoDto, {
      codigoDocumento: 251,
      codigoPedido: 615,
      nomeDocumento: 'PEDIDO',
      documento: '',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('deve falhar quando codigoDocumento não for número', async () => {
    const dto = plainToInstance(CreateDocumentoDto, {
      codigoDocumento: '251',
      codigoPedido: 615,
      nomeDocumento: 'PEDIDO',
      documento: 'base64',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('deve falhar quando codigoPedido não for número', async () => {
    const dto = plainToInstance(CreateDocumentoDto, {
      codigoDocumento: 251,
      codigoPedido: '615',
      nomeDocumento: 'PEDIDO',
      documento: 'base64',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });
});
