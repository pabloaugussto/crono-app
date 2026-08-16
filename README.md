# Crono App

Ferramenta pessoal de cronoanálise — cálculo de tempo-padrão, takt time e balanceamento de linha, feita para uso próprio no dia a dia de engenharia de métodos.

## Status

🚧 Em desenvolvimento. Por enquanto:

- [x] Tipos do domínio (`Elemento`, `Posto`, `Tolerancias`)
- [x] Cálculo de tempo observado médio
- [x] Cálculo de tempo normal (fator de ritmo)
- [x] Cálculo de tempo-padrão (tolerâncias)
- [ ] Takt time
- [ ] Balanceamento de linha (gráfico yamazumi)
- [ ] Interface (formulários e resultados)

## Stack

- [Next.js](https://nextjs.org) + TypeScript
- Tailwind CSS

## Fórmulas

```
Tempo Normal  = Tempo Observado Médio × (Fator de Ritmo / 100)
Tempo Padrão  = Tempo Normal × (1 + soma das tolerâncias)
Takt Time     = Tempo Disponível / Demanda
```

## Rodando localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estrutura

```
app/            → páginas e layout (Next.js App Router)
types/          → tipos do domínio (Elemento, Posto, Tolerancias)
lib/            → lógica de cálculo (tempo-padrão, takt time, balanceamento)
```