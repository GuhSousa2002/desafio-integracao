import { IntegracaoRepository } from '../repositories/integracao.repository';
import { IntegracaoService } from '../services/integracao.service';

describe('IntegracaoService', () => {
  it('deve criar e listar integracoes', () => {
    const repository = new IntegracaoRepository();
    const service = new IntegracaoService(repository);

    service.create({ origem: 'ERP', destino: 'LAB' });

    expect(service.findAll()).toHaveLength(1);
    expect(service.findAll()[0]?.origem).toBe('ERP');
    expect(service.findAll()[0]?.destino).toBe('LAB');
  });
});
