import { PedidosRepository } from '../repositories/pedidos.repository';
import { PedidosService } from '../services/pedidos.service';

describe('PedidosService', () => {
  it('deve criar e listar pedidos', () => {
    const repository = new PedidosRepository();
    const service = new PedidosService(repository);

    service.create({ numero: 'PED-001' });

    expect(service.findAll()).toHaveLength(1);
    expect(service.findAll()[0]?.numero).toBe('PED-001');
  });
});
