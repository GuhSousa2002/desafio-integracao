import { ExamesRepository } from '../repositories/exames.repository';

type ExameModel = ConstructorParameters<typeof ExamesRepository>[0];

describe('ExamesRepository', () => {
  let repository: ExamesRepository;

  const exameModelMock = {
    create: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    find: jest.fn(),
    deleteMany: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new ExamesRepository(exameModelMock as unknown as ExameModel);
  });

  it('deve criar um exame', async () => {
    const exameData = {
      accessionNumber: 'ACC-9001',
      nomePaciente: 'Maria Souza',
      modalidade: 'CR',
      status: 'NOVO',
    };

    exameModelMock.create.mockResolvedValue(exameData);

    const result = await repository.create(exameData);

    expect(exameModelMock.create).toHaveBeenCalledWith(exameData);
    expect(result).toEqual(exameData);
  });

  it('deve buscar exame por accessionNumber', async () => {
    const execMock = jest.fn().mockResolvedValue({
      accessionNumber: 'ACC-9001',
    });

    exameModelMock.findOne.mockReturnValue({
      exec: execMock,
    });

    const result = await repository.findByAccessionNumber('ACC-9001');

    expect(exameModelMock.findOne).toHaveBeenCalledWith({
      accessionNumber: 'ACC-9001',
    });
    expect(result).toEqual({ accessionNumber: 'ACC-9001' });
  });

  it('deve atualizar exame por accessionNumber', async () => {
    const execMock = jest.fn().mockResolvedValue({
      accessionNumber: 'ACC-9001',
      status: 'ATUALIZADO',
    });

    exameModelMock.findOneAndUpdate.mockReturnValue({
      exec: execMock,
    });

    const result = await repository.updateByAccessionNumber('ACC-9001', {
      status: 'ATUALIZADO',
    });

    expect(exameModelMock.findOneAndUpdate).toHaveBeenCalledWith(
      { accessionNumber: 'ACC-9001' },
      { status: 'ATUALIZADO' },
      { new: true },
    );

    expect(result).toEqual({
      accessionNumber: 'ACC-9001',
      status: 'ATUALIZADO',
    });
  });

  it('deve listar todos os exames', async () => {
    const execMock = jest
      .fn()
      .mockResolvedValue([
        { accessionNumber: 'ACC-9001' },
        { accessionNumber: 'ACC-9002' },
      ]);

    exameModelMock.find.mockReturnValue({
      exec: execMock,
    });

    const result = await repository.findAll();

    expect(exameModelMock.find).toHaveBeenCalled();
    expect(result).toHaveLength(2);
  });
});
