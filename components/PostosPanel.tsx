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
    <div>
      <h2>Postos de trabalho</h2>

      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome do posto"
      />
      <button onClick={adicionar}>Adicionar</button>

      <ul>
        {postos.map((p) => (
          <li key={p.id}>
            {p.nome}
            <button onClick={() => remover(p.id)}>remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}