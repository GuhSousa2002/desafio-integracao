import { PedidosRepository } from '../repositories/pedidos.repository';

describe('PedidosRepository', () => {
  it('deve armazenar pedidos em memoria', () => {
    const repository = new PedidosRepository();

    repository.create({ numero: 'PED-003' });

    expect(repository.findAll()).toHaveLength(1);
    expect(repository.findAll()[0]?.numero).toBe('PED-003');
  });
});
