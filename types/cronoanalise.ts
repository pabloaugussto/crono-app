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