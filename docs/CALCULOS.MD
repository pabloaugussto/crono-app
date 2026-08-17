# Lógica de Cálculo — Cronoanálise

Documentação da camada de cálculo do projeto (`lib/calculations.ts` + `types/cronoanalise.ts`). Aqui não tem nada de tela — só a matemática de tempo-padrão, takt time e balanceamento de linha.

## Visão geral do fluxo

```
Elemento (leituras cronometradas)
        │
        ▼
processarElemento()          → tempo observado, normal e padrão de 1 elemento
        │
        ▼
agruparPorPosto()             → soma o tempo-padrão dos elementos de cada posto
        │
        ▼
calcularBalanceamento()       → takt time, gargalo, operadores teóricos, eficiência
```

## Tipos (`types/cronoanalise.ts`)

| Tipo | O que representa |
|---|---|
| `Elemento` | Um elemento de trabalho cronometrado: nome, leituras (segundos), fator de ritmo (%) e a qual posto pertence (`postoId`) |
| `Posto` | Um posto de trabalho da linha: `id` + `nome` |
| `Tolerancias` | Percentuais de tolerância: pessoais, fadiga, especiais |
| `ParametrosLinha` | Demanda (unidades) e tempo disponível (minutos), usados no takt time |
| `ResultadoElemento` | Saída de `processarElemento`: o elemento + seus 3 tempos calculados |
| `ResultadoPosto` | Saída de `agruparPorPosto`: um posto + soma do tempo-padrão + seus elementos |
| `ResultadoBalanceamento` | Saída final de `calcularBalanceamento`: takt time, postos, gargalo, operadores teóricos, eficiência |

## Funções (`lib/calculations.ts`)

### `tempoObservadoMedio(leituras)`
Média simples das cronometragens de um elemento.
```
média = soma das leituras / quantidade de leituras
```

### `calcularTempoNormal(observadoMedio, fatorRitmo)`
Ajusta o tempo observado pelo ritmo do operador.
```
Tempo Normal = Tempo Observado Médio × (Fator de Ritmo / 100)
```

### `somaTolerancias(tolerancias)`
Soma as 3 tolerâncias e converte de % pra fração (ex: 9% → 0.09).

### `calcularTempoPadrao(tempoNormal, tolerancias)`
Aplica as tolerâncias ao tempo normal.
```
Tempo Padrão = Tempo Normal × (1 + soma das tolerâncias)
```

### `processarElemento(elemento, tolerancias)`
Junta as três funções acima numa só chamada — recebe um `Elemento` completo e devolve um `ResultadoElemento` com observado médio, normal e padrão.

### `agruparPorPosto(postos, resultadosElementos)`
Para cada posto, filtra os elementos que pertencem a ele (via `postoId`) e soma seus tempos-padrão. Devolve um `ResultadoPosto[]`.

### `calcularTaktTime(params)`
Ritmo que a linha precisa manter pra atender a demanda.
```
Takt Time (s) = (Tempo Disponível em min × 60) / Demanda
```
Protegido contra divisão por zero (demanda ≤ 0 devolve `0`).

### `calcularBalanceamento(postosResultado, params)`
Função final — junta tudo:
- **Takt time**: chama `calcularTaktTime`
- **Gargalo**: o posto com maior `tempoPadraoTotal`
- **Operadores teóricos**: soma de todos os tempos-padrão dos postos ÷ takt time
- **Eficiência do balanceamento**:
```
Eficiência (%) = soma dos tempos-padrão dos postos / (nº de postos × tempo do gargalo) × 100
```
Quanto mais perto de 100%, mais equilibrada a linha está entre os postos.

## Exemplo completo

```typescript
const tolerancias = { pessoais: 5, fadiga: 4, especiais: 0 };
const postos = [{ id: "posto-1", nome: "Corte" }];
const elementos = [
  { nome: "Cortar fio", leituras: [10, 11, 9], fatorRitmo: 100, postoId: "posto-1" },
];

const resultadosElementos = elementos.map((el) => processarElemento(el, tolerancias));
const postosAgrupados = agruparPorPosto(postos, resultadosElementos);
const balanceamento = calcularBalanceamento(postosAgrupados, {
  demanda: 400,
  tempoDisponivelMin: 480,
});
```

## Status

✅ Camada de cálculo completa e testada manualmente via `console.log`.
🚧 Próximo passo: interface (formulários de posto/elemento + tela de resultado).