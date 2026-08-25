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
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
          1
        </span>

        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-sm font-semibold text-slate-900">
            Postos de trabalho
          </h2>
        </div>
        <p className="text-xs text-slate-400 mb-4 ml-8">
          Cada posto é uma estação da linha (ex: "Corte", "Montagem"). Os
          elementos cronometrados serão agrupados dentro de um posto.
        </p>
      </div>

      <div className="flex gap-2 mb-3">
        <input
          id="nome-posto"
          name="nome-posto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && adicionar()}
          placeholder="Nome do posto"
          className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          onClick={adicionar}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Adicionar
        </button>
      </div>

      {postos.length === 0 ? (
        <p className="text-sm text-slate-400 italic">
          Nenhum posto cadastrado ainda.
        </p>
      ) : (
        <ul className="space-y-1.5">
          {postos.map((p) => (
            <li
              key={p.id}
              className="flex justify-between items-center bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-700"
            >
              {p.nome}
              <button
                onClick={() => remover(p.id)}
                className="text-red-500 hover:text-red-700 text-xs font-medium"
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
