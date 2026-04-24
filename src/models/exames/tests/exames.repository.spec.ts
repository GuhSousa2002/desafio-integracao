import { ExamesRepository } from '../repositories/exames.repository';

describe('ExamesRepository', () => {
  it('deve armazenar exames em memoria', () => {
    const repository = new ExamesRepository();

    repository.create({ nome: 'Exame C' });

    expect(repository.findAll()).toHaveLength(1);
    expect(repository.findAll()[0]?.nome).toBe('Exame C');
  });
});
