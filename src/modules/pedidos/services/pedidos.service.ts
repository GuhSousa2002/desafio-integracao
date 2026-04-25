import { Injectable, NotFoundException } from '@nestjs/common';
import { ExamesRepository } from '../../exames/repositories/exames.repository';
import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { PedidosRepository } from '../repositories/pedidos.repository';

type PedidoExameItem = {
  codigoItemPedido: number;
  accessionNumber: string;
  modalidade: string;
  nomeProcedimento: string;
};

@Injectable()
export class PedidosService {
  constructor(
    private readonly pedidosRepository: PedidosRepository,
    private readonly examesRepository: ExamesRepository,
  ) {}

  async receberPedido(dto: CreatePedidoDto) {
    const pedidoExistente = await this.pedidosRepository.findByCodigoPedido(
      dto.codigoPedido,
    );

    if (!pedidoExistente) {
      const integrado = await this.existeExameCorrespondente(dto.exames);

      const novoPedido = await this.pedidosRepository.create({
        ...dto,
        integrado,
      });

      return {
        message: 'Pedido criado com sucesso.',
        pedido: novoPedido,
      };
    }

    const examesNovos = this.filtrarExamesNovos(
      pedidoExistente.exames,
      dto.exames,
    );

    if (examesNovos.length > 0) {
      pedidoExistente.exames.push(...examesNovos);
    }

    pedidoExistente.nomePaciente = dto.nomePaciente;
    pedidoExistente.dataNascimento = dto.dataNascimento;
    pedidoExistente.sexo = dto.sexo;
    pedidoExistente.codUnidade = dto.codUnidade;

    pedidoExistente.integrado = await this.existeExameCorrespondente(
      pedidoExistente.exames,
    );

    const pedidoAtualizado = await this.pedidosRepository.save(pedidoExistente);

    return {
      message: 'Pedido atualizado com sucesso.',
      pedido: pedidoAtualizado,
      examesNovosAdicionados: examesNovos.length,
    };
  }

  async buscarPorCodigoPedido(codigoPedido: number) {
    const pedido =
      await this.pedidosRepository.findByCodigoPedido(codigoPedido);

    if (!pedido) {
      throw new NotFoundException(
        `Pedido com codigo ${codigoPedido} nao encontrado.`,
      );
    }

    return pedido;
  }

  private async existeExameCorrespondente(
    exames: PedidoExameItem[],
  ): Promise<boolean> {
    if (!exames || exames.length === 0) {
      return false;
    }

    for (const exameDoPedido of exames) {
      const exameEncontrado = await this.examesRepository.findByAccessionNumber(
        exameDoPedido.accessionNumber,
      );

      if (exameEncontrado) {
        return true;
      }
    }

    return false;
  }

  private filtrarExamesNovos(
    examesAtuais: PedidoExameItem[],
    examesRecebidos: PedidoExameItem[],
  ): PedidoExameItem[] {
    return examesRecebidos.filter((novoExame) => {
      const jaExiste = examesAtuais.some(
        (exameAtual) =>
          exameAtual.codigoItemPedido === novoExame.codigoItemPedido ||
          exameAtual.accessionNumber === novoExame.accessionNumber,
      );

      return !jaExiste;
    });
  }
}
