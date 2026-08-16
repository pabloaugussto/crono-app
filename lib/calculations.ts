import type { Elemento, Tolerancias, Posto } from '../types/cronoanalise';

export function tempoObservadoMedio(leituras: number[]): number {
    if (leituras.length === 0) {
        return 0;
    }
    const soma = leituras.reduce((acc, valor) => acc + valor, 0);
    return soma / leituras.length;
}

export function calcularTempoNormal (
    observadoMedio: number,
    fatorRitmo: number
): number {
    return observadoMedio * (fatorRitmo / 100);
}

export function somaTolerancias(tolerancias: Tolerancias): number {
    return (tolerancias.pessoais + tolerancias.fadiga + tolerancias.especiais) /100;}

    export function calcularTempoPadrao (
        tempoNormal: number,
        tolerancias: Tolerancias
    ): number {
        return tempoNormal * (1 + somaTolerancias(tolerancias));
    }
