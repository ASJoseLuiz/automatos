import { Transition } from "../interfaces/transition.interface";
import { State } from "../types/state.type";
import { AutomatoFinito } from "./AutomatoFinito";

export class AFD extends AutomatoFinito {
  constructor(
    estadoInicial: State,
    estadosFinais: State[],
    tabelaTransicao: Transition[],
    transicaoVazia: Map<State, State[]>
  ) {
    super(estadoInicial, estadosFinais, tabelaTransicao, transicaoVazia);
  }

  public verifyInput(palavra: string): boolean {
    let estadoAtual = this.getEstadoInicial();

    for (let i = 0; i < palavra.length; i++) {
      const transition = this.transition(estadoAtual, palavra[i]);

      if (transition.length > 0) {
        estadoAtual = transition[0];
      } else {
        // Caso não haja transição válida, a palavra é rejeitada
        return false;
      }
    }

    // Após processar todos os símbolos, verifica se o estado atual é final
    return this.getEstadosFinais().includes(estadoAtual);
  }
}
