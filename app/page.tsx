"use client";

import { useMemo, useState } from "react";
import type { Posto, Elemento, Tolerancias, ParametrosLinha } from "../types/cronoanalise";
import { processarElemento, agruparPorPosto, calcularBalanceamento } from "../lib/calculations";
import CronometroPanel from "../components/CronometroPanel";
import PostosPanel from "../components/PostosPanel";
import ElementosPanel from "../components/ElementosPanel";
import ParametrosPanel from "../components/ParametrosPanel";

export default function Home() {
  const [postos, setPostos] = useState<Posto[]>([]);
  const [elementos, setElementos] = useState<Elemento[]>([]);
  const [tolerancias, setTolerancias] = useState<Tolerancias>({
    pessoais: 5,
    fadiga: 4,
    especiais: 0,
  });
  const [parametrosLinha, setParametrosLinha] = useState<ParametrosLinha>({
    demanda: 400,
    tempoDisponivelMin: 480,
  });

  const resultado = useMemo(() => {
    const resultadosElementos = elementos.map((el) => processarElemento(el, tolerancias));
    const postosAgrupados = agruparPorPosto(postos, resultadosElementos);
    return calcularBalanceamento(postosAgrupados, parametrosLinha);
  }, [postos, elementos, tolerancias, parametrosLinha]);

  const corEficiencia =
    resultado.eficienciaBalanceamento >= 85
      ? "text-status-good"
      : resultado.eficienciaBalanceamento >= 65
      ? "text-status-warn"
      : "text-status-bad";

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-ink">Cronoanálise</h1>
        <p className="text-sm text-ink-soft mt-1">
          Tempo-padrão, takt time e balanceamento de linha.
        </p>
      </header>

      <div className="mb-8">
        <CronometroPanel />
      </div>

      <div className="space-y-8 mb-8">
        <PostosPanel postos={postos} onChange={setPostos} />
        <ElementosPanel postos={postos} elementos={elementos} onChange={setElementos} />
        <ParametrosPanel
          tolerancias={tolerancias}
          onToleranciasChange={setTolerancias}
          parametrosLinha={parametrosLinha}
          onParametrosLinhaChange={setParametrosLinha}
        />
      </div>

      <div className="bg-panel text-paper rounded-lg p-6">
        <h2 className="text-sm font-semibold text-paper/70 mb-4">Resultado</h2>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-xs text-paper/50 mb-0.5">Takt time</p>
            <p className="font-mono text-2xl font-semibold text-accent">
              {resultado.taktTimeSeg.toFixed(2)}s
            </p>
          </div>
          <div>
            <p className="text-xs text-paper/50 mb-0.5">Posto gargalo</p>
            <p className="text-xl font-semibold text-paper">
              {resultado.gargalo?.posto.nome ?? "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-paper/50 mb-0.5">Operadores teóricos</p>
            <p className="font-mono text-2xl font-semibold text-accent">
              {resultado.numeroOperadoresTeorico.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-paper/50 mb-0.5">Eficiência do balanceamento</p>
            <p className={`font-mono text-2xl font-semibold ${corEficiencia}`}>
              {resultado.eficienciaBalanceamento.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}