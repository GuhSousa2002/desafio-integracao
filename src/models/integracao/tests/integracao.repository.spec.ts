import { IntegracaoRepository } from '../repositories/integracao.repository';

describe('IntegracaoRepository', () => {
  it('deve armazenar integracoes em memoria', () => {
    const repository = new IntegracaoRepository();

    repository.create({ origem: 'Portal', destino: 'Fila' });

    expect(repository.findAll()).toHaveLength(1);
    expect(repository.findAll()[0]?.origem).toBe('Portal');
    expect(repository.findAll()[0]?.destino).toBe('Fila');
  });
});
