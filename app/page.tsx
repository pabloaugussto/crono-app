"use client";

import { useMemo, useState } from "react";
import type {
  Posto,
  Elemento,
  Tolerancias,
  ParametrosLinha,
} from "../types/cronoanalise";
import {
  processarElemento,
  agruparPorPosto,
  calcularBalanceamento,
} from "../lib/calculations";
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
    const resultadosElementos = elementos.map((el) =>
      processarElemento(el, tolerancias),
    );
    const postosAgrupados = agruparPorPosto(postos, resultadosElementos);
    return calcularBalanceamento(postosAgrupados, parametrosLinha);
  }, [postos, elementos, tolerancias, parametrosLinha]);

  const corEficiencia =
    resultado.eficienciaBalanceamento >= 85
      ? "text-emerald-600"
      : resultado.eficienciaBalanceamento >= 65
        ? "text-amber-600"
        : "text-red-600";

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-5">
      <header>
        <p className="text-xs uppercase tracking-wide text-slate-400 font-medium mb-1">
          Ferramenta pessoal
        </p>
        <h1 className="text-2xl font-bold text-slate-900">Cronoanálise</h1>
        <p className="text-sm text-slate-500 mt-1">
          Tempo-padrão, takt time e balanceamento de linha.
        </p>
      </header>

      <PostosPanel postos={postos} onChange={setPostos} />
      <ElementosPanel
        postos={postos}
        elementos={elementos}
        onChange={setElementos}
      />
      <ParametrosPanel
        tolerancias={tolerancias}
        onToleranciasChange={setTolerancias}
        parametrosLinha={parametrosLinha}
        onParametrosLinhaChange={setParametrosLinha}
      />

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">Resultado</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-500 mb-0.5" title="Ritmo que a linha precisa manter para atender a demanda: tempo disponível ÷ demanda.">
              Takt time ⓘ
            </p>
            <p className="font-mono text-xl font-semibold text-slate-900">
              {resultado.taktTimeSeg.toFixed(2)}s
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-0.5" title="O posto com maior tempo-padrão. Ele define o ritmo máximo possível da linha.">
              Posto gargalo ⓘ
            </p>
            <p className="text-xl font-semibold text-slate-900">
              {resultado.gargalo?.posto.nome ?? "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-0.5" title="Quantidade de operadores necessária, em teoria, para atender o takt time.">
              Operadores teóricos ⓘ
            </p>
            <p className="font-mono text-xl font-semibold text-slate-900">
              {resultado.numeroOperadoresTeorico.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-0.5" title="Quão equilibrada a linha está entre os postos. Perto de 100% = bem equilibrada.">
              Eficiência do balanceamento ⓘ
            </p>
            <p className={`font-mono text-xl font-semibold ${corEficiencia}`}>
              {resultado.eficienciaBalanceamento.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
      
    </div> )};
