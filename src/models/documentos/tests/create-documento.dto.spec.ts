import { CreateDocumentoDto } from '../dto/create-documento.dto';

describe('CreateDocumentoDto', () => {
  it('deve permitir atribuir os dados do documento', () => {
    const dto = new CreateDocumentoDto();
    dto.titulo = 'Documento D';

    expect(dto).toBeInstanceOf(CreateDocumentoDto);
    expect(dto.titulo).toBe('Documento D');
  });
});
