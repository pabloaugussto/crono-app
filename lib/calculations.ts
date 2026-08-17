import type {
  Elemento,
  Tolerancias,
  ResultadoElemento,
  ResultadoPosto,
  ParametrosLinha,
  Posto,
  ResultadoBalanceamento
} from "../types/cronoanalise";

export function tempoObservadoMedio(leituras: number[]): number {
  if (leituras.length === 0) {
    return 0;
  }
  const soma = leituras.reduce((acc, valor) => acc + valor, 0);
  return soma / leituras.length;
}

export function calcularTempoNormal(
  observadoMedio: number,
  fatorRitmo: number,
): number {
  return observadoMedio * (fatorRitmo / 100);
}

export function somaTolerancias(tolerancias: Tolerancias): number {
  return (
    (tolerancias.pessoais + tolerancias.fadiga + tolerancias.especiais) / 100
  );
}

export function calcularTempoPadrao(
  tempoNormal: number,
  tolerancias: Tolerancias,
): number {
  return tempoNormal * (1 + somaTolerancias(tolerancias));
}

export function processarElemento(
  elemento: Elemento,
  tolerancias: Tolerancias,
): ResultadoElemento {
  const observadoMedio = tempoObservadoMedio(elemento.leituras);
  const tempoNormal = calcularTempoNormal(observadoMedio, elemento.fatorRitmo);
  const tempoPadrao = calcularTempoPadrao(tempoNormal, tolerancias);

  return {
    elemento,
    tempoObservado: observadoMedio,
    tempoNormal,
    tempoPadrao,
  };
}

export function agruparPorPosto(
  postos: Posto[],
  resultadosElementos: ResultadoElemento[]
): ResultadoPosto[] {
  return postos.map((posto) => {
    const elementosDoPosto = resultadosElementos.filter(
      (r) => r.elemento.postoId === posto.id
    );
    const tempoPadraoTotal = elementosDoPosto.reduce(
      (acc, r) => acc + r.tempoPadrao,
      0
    );

    return { posto, tempoPadraoTotal, elementos: elementosDoPosto };
  });
}

export function calcularTaktTime(params: ParametrosLinha): number {
    if (params.demanda <= 0) return 0;
    const tempoDisponivelSeg = params.tempoDisponivelMin * 60;
    return tempoDisponivelSeg / params.demanda;
}

// Monta o resultado completo do balanceamento de linha
export function calcularBalanceamento(
  postosResultado: ResultadoPosto[],
  params: ParametrosLinha
): ResultadoBalanceamento {
  const taktTimeSeg = calcularTaktTime(params);

  // Encontra o posto com maior tempo-padrão total (o gargalo)
  const gargalo = postosResultado.reduce<ResultadoPosto | null>((maior, atual) => {
    if (!maior || atual.tempoPadraoTotal > maior.tempoPadraoTotal) return atual;
    return maior;
  }, null);

  const somaTemposPostos = postosResultado.reduce(
    (acc, p) => acc + p.tempoPadraoTotal,
    0
  );
  const numeroOperadoresTeorico =
    taktTimeSeg > 0 ? somaTemposPostos / taktTimeSeg : 0;

  const numeroPostos = postosResultado.length;
  const tempoGargalo = gargalo?.tempoPadraoTotal ?? 0;
  const eficienciaBalanceamento =
    numeroPostos > 0 && tempoGargalo > 0
      ? (somaTemposPostos / (numeroPostos * tempoGargalo)) * 100
      : 0;

  return {
    taktTimeSeg,
    postos: postosResultado,
    gargalo,
    numeroOperadoresTeorico,
    eficienciaBalanceamento,
  };
}
