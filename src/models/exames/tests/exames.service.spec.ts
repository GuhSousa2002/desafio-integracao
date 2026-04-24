import { NotFoundException } from '@nestjs/common';
import { ExamesService } from '../services/exames.service';

describe('ExamesService', () => {
  let service: ExamesService;

  const examesRepositoryMock = {
    findByAccessionNumber: jest.fn(),
    create: jest.fn(),
    updateByAccessionNumber: jest.fn(),
  };

  const pedidosRepositoryMock = {
    findByAccessionNumber: jest.fn(),
    save: jest.fn(),
  };

  const documentosRepositoryMock = {
    findPendentesByCodigoPedido: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    service = new ExamesService(
      examesRepositoryMock as any,
      pedidosRepositoryMock as any,
      documentosRepositoryMock as any,
    );
  });

  describe('buscarPorAccessionNumber', () => {
    it('deve retornar o exame quando encontrado', async () => {
      const exameMock = {
        accessionNumber: 'ACC-9001',
        nomePaciente: 'Maria Souza',
      };

      examesRepositoryMock.findByAccessionNumber.mockResolvedValue(exameMock);

      const result = await service.buscarPorAccessionNumber('ACC-9001');

      expect(examesRepositoryMock.findByAccessionNumber).toHaveBeenCalledWith(
        'ACC-9001',
      );
      expect(result).toEqual(exameMock);
    });

    it('deve lançar NotFoundException quando o exame não existir', async () => {
      examesRepositoryMock.findByAccessionNumber.mockResolvedValue(null);

      await expect(
        service.buscarPorAccessionNumber('ACC-9999'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('receberExame', () => {
    it('deve criar exame novo quando ainda não existir', async () => {
      const dto = {
        accessionNumber: 'ACC-9001',
        nomePaciente: 'Maria Souza',
        modalidade: 'CR',
        status: 'NOVO',
      };

      examesRepositoryMock.findByAccessionNumber.mockResolvedValueOnce(null);
      examesRepositoryMock.create.mockResolvedValue(dto);
      pedidosRepositoryMock.findByAccessionNumber.mockResolvedValue(null);

      const result = await service.receberExame(dto);

      expect(examesRepositoryMock.create).toHaveBeenCalledWith(dto);
      expect(result.pedidoIntegrado).toBe(false);
      expect(result.documentosIntegrados).toBe(0);
    });

    it('deve atualizar exame existente quando accessionNumber já existir', async () => {
      const dto = {
        accessionNumber: 'ACC-9001',
        nomePaciente: 'Maria Souza',
        modalidade: 'CR',
        status: 'ATUALIZADO',
      };

      examesRepositoryMock.findByAccessionNumber.mockResolvedValueOnce({
        accessionNumber: 'ACC-9001',
        status: 'NOVO',
      });

      examesRepositoryMock.updateByAccessionNumber.mockResolvedValue(dto);
      pedidosRepositoryMock.findByAccessionNumber.mockResolvedValue(null);

      const result = await service.receberExame(dto);

      expect(examesRepositoryMock.updateByAccessionNumber).toHaveBeenCalledWith(
        'ACC-9001',
        dto,
      );
      expect(result.exame).toEqual(dto);
    });

    it('deve marcar pedido como integrado quando encontrar pedido correspondente', async () => {
      const dto = {
        accessionNumber: 'ACC-9001',
        nomePaciente: 'Maria Souza',
        modalidade: 'CR',
        status: 'NOVO',
      };

      const pedidoMock = {
        codigoPedido: 616,
        integrado: false,
      };

      examesRepositoryMock.findByAccessionNumber.mockResolvedValueOnce(null);
      examesRepositoryMock.create.mockResolvedValue(dto);
      pedidosRepositoryMock.findByAccessionNumber.mockResolvedValue(pedidoMock);
      pedidosRepositoryMock.save.mockImplementation(async (pedido) => pedido);
      documentosRepositoryMock.findPendentesByCodigoPedido.mockResolvedValue([]);

      const result = await service.receberExame(dto);

      expect(pedidosRepositoryMock.save).toHaveBeenCalled();
      expect(result.pedidoIntegrado).toBe(true);
      expect(result.pedidoCodigo).toBe(616);
    });

    it('deve integrar documentos pendentes do pedido', async () => {
      const dto = {
        accessionNumber: 'ACC-9001',
        nomePaciente: 'Maria Souza',
        modalidade: 'CR',
        status: 'NOVO',
      };

      const pedidoMock = {
        codigoPedido: 616,
        integrado: false,
      };

      const documento1 = {
        codigoDocumento: 251,
        codigoPedido: 616,
        integrado: false,
      };

      const documento2 = {
        codigoDocumento: 252,
        codigoPedido: 616,
        integrado: false,
      };

      examesRepositoryMock.findByAccessionNumber.mockResolvedValueOnce(null);
      examesRepositoryMock.create.mockResolvedValue(dto);
      pedidosRepositoryMock.findByAccessionNumber.mockResolvedValue(pedidoMock);
      pedidosRepositoryMock.save.mockImplementation(async (pedido) => pedido);
      documentosRepositoryMock.findPendentesByCodigoPedido.mockResolvedValue([
        documento1,
        documento2,
      ]);
      documentosRepositoryMock.save.mockImplementation(async (documento) => documento);

      const result = await service.receberExame(dto);

      expect(documentosRepositoryMock.save).toHaveBeenCalledTimes(2);
      expect(result.documentosIntegrados).toBe(2);
    });
  });
});