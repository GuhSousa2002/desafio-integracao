import { NotFoundException } from '@nestjs/common';
import { PedidosService } from '../services/pedidos.service';

describe('PedidosService', () => {
  let service: PedidosService;

  const pedidosRepositoryMock = {
    findByCodigoPedido: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const examesRepositoryMock = {
    findByAccessionNumber: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    service = new PedidosService(
      pedidosRepositoryMock as any,
      examesRepositoryMock as any,
    );
  });

  describe('buscarPorCodigoPedido', () => {
    it('deve retornar o pedido quando encontrado', async () => {
      const pedidoMock = {
        codigoPedido: 616,
        nomePaciente: 'Maria Souza',
      };

      pedidosRepositoryMock.findByCodigoPedido.mockResolvedValue(pedidoMock);

      const result = await service.buscarPorCodigoPedido(616);

      expect(pedidosRepositoryMock.findByCodigoPedido).toHaveBeenCalledWith(616);
      expect(result).toEqual(pedidoMock);
    });

    it('deve lançar NotFoundException quando o pedido não existir', async () => {
      pedidosRepositoryMock.findByCodigoPedido.mockResolvedValue(null);

      await expect(service.buscarPorCodigoPedido(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('receberPedido', () => {
    it('deve criar pedido novo com integrado = false quando não existir exame correspondente', async () => {
      const dto = {
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
      };

      pedidosRepositoryMock.findByCodigoPedido.mockResolvedValue(null);
      examesRepositoryMock.findByAccessionNumber.mockResolvedValue(null);
      pedidosRepositoryMock.create.mockImplementation(async (data) => data);

      const result = await service.receberPedido(dto);

      expect(pedidosRepositoryMock.create).toHaveBeenCalledWith({
        ...dto,
        integrado: false,
      });

      expect(result.pedido.integrado).toBe(false);
    });

    it('deve criar pedido novo com integrado = true quando já existir exame correspondente', async () => {
      const dto = {
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
      };

      pedidosRepositoryMock.findByCodigoPedido.mockResolvedValue(null);
      examesRepositoryMock.findByAccessionNumber.mockResolvedValue({
        accessionNumber: 'ACC-9001',
      });
      pedidosRepositoryMock.create.mockImplementation(async (data) => data);

      const result = await service.receberPedido(dto);

      expect(pedidosRepositoryMock.create).toHaveBeenCalledWith({
        ...dto,
        integrado: true,
      });

      expect(result.pedido.integrado).toBe(true);
    });

    it('deve adicionar apenas exames novos quando o pedido já existir', async () => {
      const pedidoExistente = {
        codigoPedido: 616,
        nomePaciente: 'Maria Souza',
        dataNascimento: '19920814',
        sexo: 'F',
        codUnidade: 12,
        integrado: false,
        exames: [
          {
            codigoItemPedido: 1,
            accessionNumber: 'ACC-9001',
            modalidade: 'CR',
            nomeProcedimento: 'RX Tórax',
          },
        ],
      };

      const dto = {
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
          {
            codigoItemPedido: 2,
            accessionNumber: 'ACC-9002',
            modalidade: 'CT',
            nomeProcedimento: 'TC Crânio',
          },
        ],
      };

      pedidosRepositoryMock.findByCodigoPedido.mockResolvedValue(pedidoExistente);
      examesRepositoryMock.findByAccessionNumber.mockResolvedValue(null);
      pedidosRepositoryMock.save.mockImplementation(async (data) => data);

      const result = await service.receberPedido(dto);

      expect(result.examesNovosAdicionados).toBe(1);
      expect(result.pedido.exames).toHaveLength(2);
      expect(result.pedido.exames[1].codigoItemPedido).toBe(2);
    });
  });
});