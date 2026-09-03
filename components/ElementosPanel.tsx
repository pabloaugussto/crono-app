"use client";

import { useState } from "react";
import { paraSegundos, type UnidadeTempo } from "../lib/calculations";
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
  const [unidade, setUnidade] = useState<UnidadeTempo>("segundos");

  function adicionar() {
    const nomeLimpo = nome.trim();
    const posto = postoId || postos[0]?.id;

    const leituras = leiturasTexto
      .split(",")
      .map((v) => paraSegundos(parseFloat(v.trim()), unidade))
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
    <div className="border-l-2 border-structural/40 pl-6">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-mono text-xs text-structural">02</span>
        <h2 className="text-sm font-semibold text-ink">Elementos cronometrados</h2>
      </div>
      <p className="text-xs text-ink-soft/70 mb-4">
        Um elemento é uma tarefa (ou o ciclo completo) cronometrado dentro de um posto.
      </p>

      {postos.length === 0 ? (
        <p className="text-sm text-ink-soft/60 italic">Cadastre um posto primeiro.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <label className="flex flex-col gap-1 text-xs text-ink-soft">
              Nome do elemento
              <input
                id="nome-elemento"
                name="nome-elemento"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="ex: Ciclo completo"
                className="border border-ink/15 bg-paper rounded-md px-3 py-2 text-sm text-ink placeholder:text-ink-soft/50 outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
              />
            </label>

            <label className="flex flex-col gap-1 text-xs text-ink-soft">
              Posto
              <select
                id="posto-elemento"
                name="posto-elemento"
                value={postoId || postos[0].id}
                onChange={(e) => setPostoId(e.target.value)}
                className="border border-ink/15 bg-paper rounded-md px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
              >
                {postos.map((p) => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-[1fr_110px_120px] gap-2 mb-3">
            <label className="flex flex-col gap-1 text-xs text-ink-soft">
              Tempos cronometrados
              <input
                id="leituras-elemento"
                name="leituras-elemento"
                value={leiturasTexto}
                onChange={(e) => setLeiturasTexto(e.target.value)}
                placeholder={unidade === "minutos" ? "ex: 25, 24, 26" : "ex: 12, 14, 13"}
                className="border border-ink/15 bg-paper rounded-md px-3 py-2 text-sm font-mono text-ink placeholder:text-ink-soft/50 placeholder:font-sans outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
              />
            </label>

            <label className="flex flex-col gap-1 text-xs text-ink-soft">
              Unidade
              <select
                id="unidade-leitura"
                name="unidade-leitura"
                value={unidade}
                onChange={(e) => setUnidade(e.target.value as UnidadeTempo)}
                className="border border-ink/15 bg-paper rounded-md px-2 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
              >
                <option value="segundos">segundos</option>
                <option value="minutos">minutos</option>
              </select>
            </label>

            <label className="flex flex-col gap-1 text-xs text-ink-soft">
              Ritmo (%)
              <input
                id="fator-ritmo"
                name="fator-ritmo"
                value={fatorRitmo}
                onChange={(e) => setFatorRitmo(e.target.value)}
                placeholder="100"
                className="border border-ink/15 bg-paper rounded-md px-3 py-2 text-sm font-mono text-ink placeholder:text-ink-soft/50 outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
              />
            </label>
          </div>

          <button
            onClick={adicionar}
            className="bg-accent-dark text-paper px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity mb-3"
          >
            Adicionar elemento
          </button>

          {elementos.length > 0 && (
            <ul className="space-y-1.5">
              {elementos.map((el, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-ink/5 rounded-md px-3 py-2 text-sm text-ink"
                >
                  <span>
                    <span className="font-medium text-ink">{el.nome}</span>
                    {" — "}
                    {el.leituras.length} leitura(s), ritmo {el.fatorRitmo}%
                  </span>
                  <button
                    onClick={() => remover(i)}
                    className="text-red-700 hover:text-red-800 text-xs font-medium"
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
