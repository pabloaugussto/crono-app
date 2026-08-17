export interface Elemento {
  nome: string;
  leituras: number[];  
  fatorRitmo: number; 
  postoId: string; 
}

export interface Tolerancias{
    pessoais: number;
    fadiga: number;
    especiais: number;
}

export interface Posto {
    id: string;
    nome: string;
}

export interface ResultadoElemento {
    elemento: Elemento;
    tempoObservado: number;
    tempoNormal: number;
    tempoPadrao: number;
}

export interface ResultadoPosto {
    posto: Posto;
    tempoPadraoTotal: number;
    elementos: ResultadoElemento[];
}

export interface ParametrosLinha {
    demanda: number; //unidade no periodo
    tempoDisponivelMin: number; //minutos disponiveis no periodo
}

export interface ResultadoBalanceamento {
    taktTimeSeg: number;
    postos: ResultadoPosto[];
    gargalo: ResultadoPosto | null;
     numeroOperadoresTeorico: number;
    eficienciaBalanceamento: number; //em %
}