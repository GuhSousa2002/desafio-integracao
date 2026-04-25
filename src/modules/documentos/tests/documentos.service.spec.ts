import { ConflictException } from '@nestjs/common';
import { DocumentosService } from '../services/documentos.service';

type DocumentosServiceDependencies = ConstructorParameters<
  typeof DocumentosService
>;

describe('DocumentosService', () => {
  let service: DocumentosService;

  const documentosRepositoryMock = {
    findByCodigoPedidoAndCodigoDocumento: jest.fn(),
    create: jest.fn(),
    findByCodigoPedido: jest.fn(),
  };

  const pedidosRepositoryMock = {
    findByCodigoPedido: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    service = new DocumentosService(
      documentosRepositoryMock as unknown as DocumentosServiceDependencies[0],
      pedidosRepositoryMock as unknown as DocumentosServiceDependencies[1],
    );
  });

  describe('receberDocumento', () => {
    it('deve lançar erro quando existir documento duplicado', async () => {
      const dto = {
        codigoDocumento: 251,
        codigoPedido: 615,
        nomeDocumento: 'PEDIDO',
        documento: 'base64',
      };

      documentosRepositoryMock.findByCodigoPedidoAndCodigoDocumento.mockResolvedValue(
        {
          codigoDocumento: 251,
          codigoPedido: 615,
        },
      );

      await expect(service.receberDocumento(dto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('deve criar documento com integrado = false quando pedido não existir', async () => {
      const dto = {
        codigoDocumento: 251,
        codigoPedido: 615,
        nomeDocumento: 'PEDIDO',
        documento: 'base64',
      };

      documentosRepositoryMock.findByCodigoPedidoAndCodigoDocumento.mockResolvedValue(
        null,
      );
      pedidosRepositoryMock.findByCodigoPedido.mockResolvedValue(null);
      documentosRepositoryMock.create.mockImplementation((data: unknown) =>
        Promise.resolve(data),
      );

      const result = await service.receberDocumento(dto);

      expect(documentosRepositoryMock.create).toHaveBeenCalledWith({
        ...dto,
        integrado: false,
      });

      expect(result.documento.integrado).toBe(false);
    });

    it('deve criar documento com integrado = false quando pedido existir mas não estiver integrado', async () => {
      const dto = {
        codigoDocumento: 251,
        codigoPedido: 615,
        nomeDocumento: 'PEDIDO',
        documento: 'base64',
      };

      documentosRepositoryMock.findByCodigoPedidoAndCodigoDocumento.mockResolvedValue(
        null,
      );
      pedidosRepositoryMock.findByCodigoPedido.mockResolvedValue({
        codigoPedido: 615,
        integrado: false,
      });
      documentosRepositoryMock.create.mockImplementation((data: unknown) =>
        Promise.resolve(data),
      );

      const result = await service.receberDocumento(dto);

      expect(documentosRepositoryMock.create).toHaveBeenCalledWith({
        ...dto,
        integrado: false,
      });

      expect(result.documento.integrado).toBe(false);
    });

    it('deve criar documento com integrado = true quando pedido já estiver integrado', async () => {
      const dto = {
        codigoDocumento: 251,
        codigoPedido: 615,
        nomeDocumento: 'PEDIDO',
        documento: 'base64',
      };

      documentosRepositoryMock.findByCodigoPedidoAndCodigoDocumento.mockResolvedValue(
        null,
      );
      pedidosRepositoryMock.findByCodigoPedido.mockResolvedValue({
        codigoPedido: 615,
        integrado: true,
      });
      documentosRepositoryMock.create.mockImplementation((data: unknown) =>
        Promise.resolve(data),
      );

      const result = await service.receberDocumento(dto);

      expect(documentosRepositoryMock.create).toHaveBeenCalledWith({
        ...dto,
        integrado: true,
      });

      expect(result.documento.integrado).toBe(true);
    });
  });

  describe('buscarPorCodigoPedido', () => {
    it('deve retornar os documentos do pedido', async () => {
      const documentos = [
        {
          codigoDocumento: 251,
          codigoPedido: 615,
          nomeDocumento: 'PEDIDO',
          documento: 'base64',
          integrado: false,
        },
      ];

      documentosRepositoryMock.findByCodigoPedido.mockResolvedValue(documentos);

      const result = await service.buscarPorCodigoPedido(615);

      expect(documentosRepositoryMock.findByCodigoPedido).toHaveBeenCalledWith(
        615,
      );
      expect(result).toEqual(documentos);
    });
  });
});
