import { PedidosRepository } from '../repositories/pedidos.repository';

describe('PedidosRepository', () => {
  let repository: PedidosRepository;

  const pedidoModelMock = {
    create: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    deleteMany: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new PedidosRepository(pedidoModelMock as any);
  });

  it('deve criar um pedido', async () => {
    const pedidoData = {
      codigoPedido: 616,
      nomePaciente: 'Maria Souza',
    };

    pedidoModelMock.create.mockResolvedValue(pedidoData);

    const result = await repository.create(pedidoData as any);

    expect(pedidoModelMock.create).toHaveBeenCalledWith(pedidoData);
    expect(result).toEqual(pedidoData);
  });

  it('deve buscar por codigoPedido', async () => {
    const execMock = jest.fn().mockResolvedValue({ codigoPedido: 616 });

    pedidoModelMock.findOne.mockReturnValue({
      exec: execMock,
    });

    const result = await repository.findByCodigoPedido(616);

    expect(pedidoModelMock.findOne).toHaveBeenCalledWith({ codigoPedido: 616 });
    expect(result).toEqual({ codigoPedido: 616 });
  });

  it('deve buscar por accessionNumber dentro de exames', async () => {
    const execMock = jest.fn().mockResolvedValue({ codigoPedido: 616 });

    pedidoModelMock.findOne.mockReturnValue({
      exec: execMock,
    });

    const result = await repository.findByAccessionNumber('ACC-9001');

    expect(pedidoModelMock.findOne).toHaveBeenCalledWith({
      'exames.accessionNumber': 'ACC-9001',
    });

    expect(result).toEqual({ codigoPedido: 616 });
  });
});