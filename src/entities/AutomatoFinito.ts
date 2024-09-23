import { Transition } from "../interfaces/transition.interface";
import { State, Symbol } from "../types/state.type";

export class AutomatoFinito {
  private estadoInicial: State;
  private estadosFinais: State[];
  private tabelaTransicao: Transition[];
  private transicaoVazia: Map<State, State[]>;

  constructor(
    estadoInicial: State,
    estadosFinais: State[],
    tabelaTransicao: Transition[],
    transicaoVazia: Map<State, State[]>
  ) {
    this.estadoInicial = estadoInicial;
    this.estadosFinais = estadosFinais;
    this.tabelaTransicao = tabelaTransicao;
    this.transicaoVazia = transicaoVazia;
  }

  protected getEstadoInicial(): State {
    return this.estadoInicial;
  }

  protected getEstadosFinais(): State[] {
    return this.estadosFinais;
  }

  protected getTabelaTransicao(): Transition[] {
    return this.tabelaTransicao;
  }

  protected getTransicaoVazia(): Map<State, State[]> {
    return this.transicaoVazia;
  }

  protected transition(estado: State, simbolo: Symbol): State[] {
    return this.getTabelaTransicao()
      .filter(
        (transicao) => transicao.from === estado && transicao.symbol === simbolo
      )
      .map((transicao) => transicao.to);
  }
}
