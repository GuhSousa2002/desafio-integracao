import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExameDto } from '../dto/create-exame.dto';
import { ExamesRepository } from '../repositories/exames.repository';
import { PedidosRepository } from '../../pedidos/repositories/pedidos.repository';
import { DocumentosRepository } from '../../documentos/repositories/documentos.repository';

@Injectable()
export class ExamesService {
  constructor(

    private readonly examesRepository: ExamesRepository,

    private readonly pedidosRepository: PedidosRepository,

    private readonly documentosRepository: DocumentosRepository,
  ) { }

  async receberExame(dto: CreateExameDto) {

    const exameExistente = await this.examesRepository.findByAccessionNumber(
      dto.accessionNumber,
    );

    let exameSalvo: any;


    if (exameExistente) {
      exameSalvo = await this.examesRepository.updateByAccessionNumber(
        dto.accessionNumber,
        dto,
      );
    } else {
      exameSalvo = await this.examesRepository.create(dto);
    }

    const pedido = await this.pedidosRepository.findByAccessionNumber(
      dto.accessionNumber,
    );

    if (!pedido) {
      return {
        message:
          'Exame salvo com sucesso, mas nenhum pedido correspondente foi encontrado.',
        exame: exameSalvo,
        pedidoIntegrado: false,
        documentosIntegrados: 0,
      };
    }


    if (!pedido.integrado) {
      pedido.integrado = true;
      await this.pedidosRepository.save(pedido);
    }


    const documentosPendentes =
      await this.documentosRepository.findPendentesByCodigoPedido(
        pedido.codigoPedido,
      );


    let quantidadeDocumentosIntegrados = 0;

    for (const documento of documentosPendentes) {
      documento.integrado = true;
      await this.documentosRepository.save(documento);
      quantidadeDocumentosIntegrados++;
    }

    return {
      message:
        'Exame salvo com sucesso. Pedido integrado e documentos pendentes processados.',
      exame: exameSalvo,
      pedidoCodigo: pedido.codigoPedido,
      pedidoIntegrado: true,
      documentosIntegrados: quantidadeDocumentosIntegrados,
    };
  }

  async buscarPorAccessionNumber(accessionNumber: string) {
    const exame = await this.examesRepository.findByAccessionNumber(
      accessionNumber,
    );

    if (!exame) {
      throw new NotFoundException(
        `Exame com accessionNumber ${accessionNumber} não encontrado.`,
      );
    }

    return exame;
  }
}