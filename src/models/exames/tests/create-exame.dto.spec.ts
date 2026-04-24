import { CreateExameDto } from '../dto/create-exame.dto';

describe('CreateExameDto', () => {
  it('deve permitir atribuir os dados do exame', () => {
    const dto = new CreateExameDto();
    dto.nome = 'Exame D';

    expect(dto).toBeInstanceOf(CreateExameDto);
    expect(dto.nome).toBe('Exame D');
  });
});
