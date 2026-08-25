"use client";

import { useState } from "react";
import type { Elemento, Posto } from "../types/cronoanalise";

interface Props {
  postos: Posto[];
  elementos: Elemento[];
  onChange: (elementos: Elemento[]) => void;
}

export default function ElementosPanel({ postos, elementos, onChange }: Props) {
  const [nome, setNome] = useState("");
  const [postoId, setPostoId] = useState("");
  const [leiturasTexto, setLeiturasTexto] = useState("");
  const [fatorRitmo, setFatorRitmo] = useState("100");

  function adicionar() {
    const nomeLimpo = nome.trim();
    const posto = postoId || postos[0]?.id;

    const leituras = leiturasTexto
      .split(",")
      .map((v) => parseFloat(v.trim()))
      .filter((v) => !isNaN(v) && v > 0);

    if (!nomeLimpo || !posto || leituras.length === 0) return;

    const novoElemento: Elemento = {
      nome: nomeLimpo,
      leituras,
      fatorRitmo: parseFloat(fatorRitmo) || 100,
      postoId: posto,
    };

    onChange([...elementos, novoElemento]);
    setNome("");
    setLeiturasTexto("");
    setFatorRitmo("100");
  }

  function remover(index: number) {
    onChange(elementos.filter((_, i) => i !== index));
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
            2
          </span>
          <h2 className="text-sm font-semibold text-slate-900">
            Elementos cronometrados
          </h2>
        </div>
        <p className="text-xs text-slate-400 mb-4 ml-8">
          Um elemento é uma tarefa pequena dentro do posto (ex: "inserir
          terminal"). Cronometre a mesma tarefa algumas vezes e digite os tempos
          separados por vírgula.
        </p>
      </div>

      {postos.length === 0 ? (
        <p className="text-sm text-slate-400 italic">
          Cadastre um posto primeiro.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              id="nome-elemento"
              name="nome-elemento"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do elemento"
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <select
              id="posto-elemento"
              name="posto-elemento"
              value={postoId || postos[0].id}
              onChange={(e) => setPostoId(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {postos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-[1fr_140px] gap-2 mb-3">
            <input
              id="leituras-elemento"
              name="leituras-elemento"
              value={leiturasTexto}
              onChange={(e) => setLeiturasTexto(e.target.value)}
              placeholder="Leituras (s), ex: 12, 14, 13"
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono text-slate-900 placeholder:text-slate-400 placeholder:font-sans outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              id="fator-ritmo"
              name="fator-ritmo"
              value={fatorRitmo}
              onChange={(e) => setFatorRitmo(e.target.value)}
              placeholder="Ritmo (%)"
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono text-slate-900 placeholder:text-slate-400 placeholder:font-sans outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            onClick={adicionar}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors mb-3"
          >
            Adicionar elemento
          </button>

          {elementos.length > 0 && (
            <ul className="space-y-1.5">
              {elementos.map((el, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-700"
                >
                  <span>
                    <span className="font-medium text-slate-900">
                      {el.nome}
                    </span>
                    {" — "}
                    {el.leituras.length} leitura(s), ritmo {el.fatorRitmo}%
                  </span>
                  <button
                    onClick={() => remover(i)}
                    className="text-red-500 hover:text-red-700 text-xs font-medium"
                  >
                    remover
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
