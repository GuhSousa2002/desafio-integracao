import { DocumentosRepository } from '../repositories/documentos.repository';

describe('DocumentosRepository', () => {
  it('deve armazenar documentos em memoria', () => {
    const repository = new DocumentosRepository();

    repository.create({ titulo: 'Documento C' });

    expect(repository.findAll()).toHaveLength(1);
    expect(repository.findAll()[0]?.titulo).toBe('Documento C');
  });
});
