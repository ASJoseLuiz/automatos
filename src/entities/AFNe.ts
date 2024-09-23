import { Transition } from "../interfaces/transition.interface";
import { State } from "../types/state.type";
import { AutomatoFinito } from "./AutomatoFinito";

export class AFNe extends AutomatoFinito {
  constructor(
    estadoInicial: State,
    estadosFinais: State[],
    tabelaTransicao: Transition[],
    transicaoVazia: Map<State, State[]>
  ) {
    super(estadoInicial, estadosFinais, tabelaTransicao, transicaoVazia);
  }

  public verifyInput(palavra: string): boolean {
    let estadosAtuais = this.closure([this.getEstadoInicial()]);

    for (let i = 0; i < palavra.length; i++) {
      const simbolo = palavra[i];
      let novosEstados: State[] = [];

      for (const estado of estadosAtuais) {
        novosEstados = [...novosEstados, ...this.transition(estado, simbolo)];
      }

      estadosAtuais = this.closure(novosEstados);

      if (estadosAtuais.length === 0) {
        return false; // Nenhum estado foi atingido
      }
    }

    return estadosAtuais.some((estado) =>
      this.getEstadosFinais().includes(estado)
    );
  }

  private closure(estados: State[]): State[] {
    let fecho: Set<State> = new Set(estados);

    for (const estado of estados) {
      const estadosEpsilon = this.getTransicaoVazia().get(estado) || [];
      estadosEpsilon.forEach((est) => fecho.add(est));
      fecho = new Set([...fecho, ...this.closure(estadosEpsilon)]);
    }

    return Array.from(fecho);
  }
}
