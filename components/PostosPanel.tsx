"use client";

import { useState } from "react";
import type { Posto } from "../types/cronoanalise";

interface Props {
  postos: Posto[];
  onChange: (postos: Posto[]) => void;
}

export default function PostosPanel({ postos, onChange }: Props) {
  const [nome, setNome] = useState("");

  function adicionar() {
    const nomeLimpo = nome.trim();
    if (!nomeLimpo) return; // não deixa adicionar posto vazio

    const novoPosto: Posto = {
      id: crypto.randomUUID(),
      nome: nomeLimpo,
    };

    onChange([...postos, novoPosto]);
    setNome("");
  }

  function remover(id: string) {
    onChange(postos.filter((p) => p.id !== id));
  }

  return (
    <div className="border-l-2 border-structural/40 pl-6">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-mono text-xs text-structural">01</span>
        <h2 className="text-sm font-semibold text-ink">Postos de trabalho</h2>
      </div>
      <p className="text-xs text-ink-soft/70 mb-4">
        Cada posto é uma estação da linha (ex: &quot;Corte&quot;,
        &quot;Montagem&quot;). Os elementos cronometrados serão agrupados dentro
        de um posto.
      </p>

      <div className="flex gap-2 mb-3">
        <input
          id="nome-posto"
          name="nome-posto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && adicionar()}
          placeholder="Nome do posto"
          className="flex-1 border border-ink/15 bg-paper rounded-md px-3 py-2 text-sm text-ink placeholder:text-ink-soft/50 outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
        />
        <button
          onClick={adicionar}
          className="bg-accent-dark text-paper px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Adicionar
        </button>
      </div>

      {postos.length === 0 ? (
        <p className="text-sm text-ink-soft/60 italic">
          Nenhum posto cadastrado ainda.
        </p>
      ) : (
        <ul className="space-y-1.5">
          {postos.map((p) => (
            <li
              key={p.id}
              className="flex justify-between items-center bg-ink/5 rounded-md px-3 py-2 text-sm text-ink"
            >
              {p.nome}
              <button
                onClick={() => remover(p.id)}
                className="text-red-700 hover:text-red-800 text-xs font-medium"
              >
                remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
