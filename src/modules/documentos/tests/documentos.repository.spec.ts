import { DocumentosRepository } from '../repositories/documentos.repository';

type DocumentoModel = ConstructorParameters<typeof DocumentosRepository>[0];

describe('DocumentosRepository', () => {
  let repository: DocumentosRepository;

  const documentoModelMock = {
    create: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    deleteMany: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new DocumentosRepository(
      documentoModelMock as unknown as DocumentoModel,
    );
  });

  it('deve criar um documento', async () => {
    const documentoData = {
      codigoDocumento: 251,
      codigoPedido: 615,
      nomeDocumento: 'PEDIDO',
      documento: 'base64',
      integrado: false,
    };

    documentoModelMock.create.mockResolvedValue(documentoData);

    const result = await repository.create(documentoData);

    expect(documentoModelMock.create).toHaveBeenCalledWith(documentoData);
    expect(result).toEqual(documentoData);
  });

  it('deve buscar por codigoPedido + codigoDocumento', async () => {
    const execMock = jest.fn().mockResolvedValue({
      codigoDocumento: 251,
      codigoPedido: 615,
    });

    documentoModelMock.findOne.mockReturnValue({
      exec: execMock,
    });

    const result = await repository.findByCodigoPedidoAndCodigoDocumento(
      615,
      251,
    );

    expect(documentoModelMock.findOne).toHaveBeenCalledWith({
      codigoPedido: 615,
      codigoDocumento: 251,
    });

    expect(result).toEqual({
      codigoDocumento: 251,
      codigoPedido: 615,
    });
  });

  it('deve buscar todos os documentos de um pedido', async () => {
    const execMock = jest.fn().mockResolvedValue([
      { codigoDocumento: 251, codigoPedido: 615 },
      { codigoDocumento: 252, codigoPedido: 615 },
    ]);

    documentoModelMock.find.mockReturnValue({
      exec: execMock,
    });

    const result = await repository.findByCodigoPedido(615);

    expect(documentoModelMock.find).toHaveBeenCalledWith({
      codigoPedido: 615,
    });

    expect(result).toHaveLength(2);
  });

  it('deve buscar documentos pendentes por codigoPedido', async () => {
    const execMock = jest
      .fn()
      .mockResolvedValue([
        { codigoDocumento: 251, codigoPedido: 615, integrado: false },
      ]);

    documentoModelMock.find.mockReturnValue({
      exec: execMock,
    });

    const result = await repository.findPendentesByCodigoPedido(615);

    expect(documentoModelMock.find).toHaveBeenCalledWith({
      codigoPedido: 615,
      integrado: false,
    });

    expect(result).toEqual([
      { codigoDocumento: 251, codigoPedido: 615, integrado: false },
    ]);
  });
});
