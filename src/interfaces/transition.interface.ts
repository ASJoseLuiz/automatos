import { State, Symbol } from "../types/state.type";

export interface Transition {
  from: State;
  to: State;
  symbol: Symbol
}