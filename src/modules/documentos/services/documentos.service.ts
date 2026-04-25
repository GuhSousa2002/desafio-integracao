import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDocumentoDto } from '../dto/create-documento.dto';
import { DocumentosRepository } from '../repositories/documentos.repository';
import { PedidosRepository } from '../../pedidos/repositories/pedidos.repository';

@Injectable()
export class DocumentosService {
  constructor(
    private readonly documentosRepository: DocumentosRepository,

    private readonly pedidosRepository: PedidosRepository,
  ) {}

  async receberDocumento(dto: CreateDocumentoDto) {
    const documentoDuplicado =
      await this.documentosRepository.findByCodigoPedidoAndCodigoDocumento(
        dto.codigoPedido,
        dto.codigoDocumento,
      );

    if (documentoDuplicado) {
      throw new ConflictException(
        `Já existe documento ${dto.codigoDocumento} para o pedido ${dto.codigoPedido}.`,
      );
    }

    const pedido = await this.pedidosRepository.findByCodigoPedido(
      dto.codigoPedido,
    );

    const integrado = !!pedido?.integrado;

    const documentoCriado = await this.documentosRepository.create({
      ...dto,
      integrado,
    });

    return {
      message: integrado
        ? 'Documento criado e já integrado ao pedido.'
        : 'Documento criado com sucesso, mas ainda pendente de integração.',
      documento: documentoCriado,
    };
  }

  async buscarPorCodigoPedido(codigoPedido: number) {
    return this.documentosRepository.findByCodigoPedido(codigoPedido);
  }
}
