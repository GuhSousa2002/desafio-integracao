import { CreatePedidoDto } from '../dto/create-pedido.dto';

describe('CreatePedidoDto', () => {
  it('deve permitir atribuir os dados do pedido', () => {
    const dto = new CreatePedidoDto();
    dto.numero = 'PED-004';

    expect(dto).toBeInstanceOf(CreatePedidoDto);
    expect(dto.numero).toBe('PED-004');
  });
});
