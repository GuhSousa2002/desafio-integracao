import { ExamesRepository } from '../repositories/exames.repository';
import { ExamesService } from '../services/exames.service';

describe('ExamesService', () => {
  it('deve criar e listar exames', () => {
    const repository = new ExamesRepository();
    const service = new ExamesService(repository);

    service.create({ nome: 'Exame A' });

    expect(service.findAll()).toHaveLength(1);
    expect(service.findAll()[0]?.nome).toBe('Exame A');
  });
});
