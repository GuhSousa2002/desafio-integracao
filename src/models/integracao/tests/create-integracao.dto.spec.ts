import { CreateIntegracaoDto } from '../dto/create-integracao.dto';

describe('CreateIntegracaoDto', () => {
  it('deve permitir atribuir os dados da integracao', () => {
    const dto = new CreateIntegracaoDto();
    dto.origem = 'App';
    dto.destino = 'Servico';

    expect(dto).toBeInstanceOf(CreateIntegracaoDto);
    expect(dto.origem).toBe('App');
    expect(dto.destino).toBe('Servico');
  });
});
