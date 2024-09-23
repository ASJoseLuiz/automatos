import { AFD } from "./entities/AFD";
import { AFNe } from "./entities/AFNe";
import { Transition } from "./interfaces/transition.interface";
import { State } from "./types/state.type";

class Main {
  private afd: AFD;
  private afne: AFNe;

  constructor() {
    this.afd = this.instanciarAFD();
    this.afne = this.instanciarAFNe();
  }

  private instanciarAFD(): AFD {
    const estadoInicial: State = "q0";
    const estadosFinais: State[] = ["q11"];
    const tabelaTransicao: Transition[] = [];
    const conjuntoQ0 = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
      "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    const conjuntoQ1 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

    for (const symbol of conjuntoQ0) {
      tabelaTransicao.push({ from: "q0", to: "q1", symbol: symbol });
    }

    for (const symbol of conjuntoQ1) {
      tabelaTransicao.push({ from: "q1", to: "q1", symbol: symbol });
    }

    for (const symbol of conjuntoQ0) {
        tabelaTransicao.push({ from: "q1", to: "q1", symbol: symbol})
    }

    tabelaTransicao.push({ from: "q1", to: "q2", symbol: "@" });
    tabelaTransicao.push({ from: "q2", to: "q3", symbol: "g" });
    tabelaTransicao.push({ from: "q3", to: "q4", symbol: "m" });
    tabelaTransicao.push({ from: "q4", to: "q5", symbol: "a" });
    tabelaTransicao.push({ from: "q5", to: "q6", symbol: "i" });
    tabelaTransicao.push({ from: "q6", to: "q7", symbol: "l" });
    tabelaTransicao.push({ from: "q7", to: "q8", symbol: "." });
    tabelaTransicao.push({ from: "q8", to: "q9", symbol: "c" });
    tabelaTransicao.push({ from: "q9", to: "q10", symbol: "o" });
    tabelaTransicao.push({ from: "q10", to: "q11", symbol: "m" });
      
    const transicaoVazia = new Map<State, State[]>(); // Não há transição epsilon em AFD
    console.log(tabelaTransicao)
    
    return new AFD(
      estadoInicial,
      estadosFinais,
      tabelaTransicao,
      transicaoVazia
    );
  }

  private instanciarAFNe(): AFNe {
    const estadoInicial: State = "q0";
    const estadosFinais: State[] = ["q2"];
    const tabelaTransicao: Transition[] = [
      { from: "q0", to: "q0", symbol: "a" },
      { from: "q1", to: "q1", symbol: "b" },
      { from: "q2", to: "q2", symbol: "c" },
    ];

    const transicaoVazia = new Map<State, State[]>([
      ["q0", ["q1"]],
      ["q1", ["q2"]],
    ]);

    console.log(tabelaTransicao)
    console.log(transicaoVazia)
    return new AFNe(
      estadoInicial,
      estadosFinais,
      tabelaTransicao,
      transicaoVazia
    );
  }

  public testarPalavras(palavrasAFNe: string[], palavrasAFD: string[]): void {
    console.log("Testando com AFD:");
    palavrasAFD.forEach((palavra) => {
      const resultado = this.afd.verifyInput(palavra) ? "ACEITA" : "REJEITA";
      console.log(`Palavra "${palavra}": ${resultado}`);
    });

    console.log("\nTestando com AFNe:");
    palavrasAFNe.forEach((palavra) => {
      const resultado = this.afne.verifyInput(palavra) ? "ACEITA" : "REJEITA";
      console.log(`Palavra "${palavra}": ${resultado}`);
    });
  }
}

// Executando os testes
const main = new Main();
const palavrasAFD = ["jose@gmail.com", "jose2321mail", "jose.luiz@gmail.com", "jose@gmail."];
const palavrasAFNe = ["aaa", "ab", "abc", "c", "", "a", "b", "c", "aabbcc"];
main.testarPalavras(palavrasAFNe, palavrasAFD);
