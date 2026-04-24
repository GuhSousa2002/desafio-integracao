import { DocumentosRepository } from '../repositories/documentos.repository';
import { DocumentosService } from '../services/documentos.service';

describe('DocumentosService', () => {
  it('deve criar e listar documentos', () => {
    const repository = new DocumentosRepository();
    const service = new DocumentosService(repository);

    service.create({ titulo: 'Documento A' });

    expect(service.findAll()).toHaveLength(1);
    expect(service.findAll()[0]?.titulo).toBe('Documento A');
  });
});
