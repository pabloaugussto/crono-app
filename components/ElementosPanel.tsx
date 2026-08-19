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
    <div>
      <h2>Elementos cronometrados</h2>

      {postos.length === 0 ? (
        <p>Cadastre um posto primeiro.</p>
      ) : (
        <>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do elemento"
          />

          <select value={postoId || postos[0].id} onChange={(e) => setPostoId(e.target.value)}>
            {postos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>

          <input
            value={leiturasTexto}
            onChange={(e) => setLeiturasTexto(e.target.value)}
            placeholder="Leituras em segundos, ex: 12, 14, 13"
          />

          <input
            value={fatorRitmo}
            onChange={(e) => setFatorRitmo(e.target.value)}
            placeholder="Fator de ritmo (%)"
          />

          <button onClick={adicionar}>Adicionar elemento</button>

          <ul>
            {elementos.map((el, i) => (
              <li key={i}>
                {el.nome} — {el.leituras.length} leitura(s), ritmo {el.fatorRitmo}%
                <button onClick={() => remover(i)}>remover</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}