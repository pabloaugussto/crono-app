"use client";

import { useState, useRef, useEffect } from "react";

function formatarTempo(ms: number): string {
  const totalSegundos = ms / 1000;
  const minutos = Math.floor(totalSegundos / 60);
  const segundos = (totalSegundos % 60).toFixed(1);
  return `${minutos.toString().padStart(2, "0")}:${segundos.padStart(4, "0")}`;
}

export default function CronometroPanel() {
  const [rodando, setRodando] = useState(false);
  const [tempoDecorrido, setTempoDecorrido] = useState(0);
  const [voltas, setVoltas] = useState<number[]>([]);
  const inicioRef = useRef<number | null>(null);

  useEffect(() => {
    if (!rodando) return;

    const id = setInterval(() => {
      if (inicioRef.current !== null) {
        setTempoDecorrido(performance.now() - inicioRef.current);
      }
    }, 100);

    return () => clearInterval(id);
  }, [rodando]);

  function iniciar() {
    inicioRef.current = performance.now() - tempoDecorrido; // permite retomar após pausar
    setRodando(true);
  }

  function marcarVolta() {
    if (!rodando || inicioRef.current === null) return;
    const totalSegundos = (performance.now() - inicioRef.current) / 1000;
    setVoltas((prev) => [...prev, totalSegundos]);
  }

  function parar() {
    setRodando(false);
  }

  function zerar() {
    setRodando(false);
    setTempoDecorrido(0);
    setVoltas([]);
    inicioRef.current = null;
  }

    return (
    <div className="border border-structural/30 rounded-lg p-6 bg-ink/[0.02]">
      <h2 className="text-sm font-semibold text-ink mb-1">Cronômetro</h2>
      <p className="text-xs text-ink-soft/70 mb-4">
        Cronometre ao vivo e capture voltas — depois é só usar esses tempos como leituras de um elemento.
      </p>

      <div className="text-center mb-4">
        <span className="font-mono text-4xl text-ink tabular-nums">
          {formatarTempo(tempoDecorrido)}
        </span>
      </div>

      <div className="flex gap-2 justify-center mb-4">
        {!rodando ? (
          <button
            onClick={iniciar}
            className="bg-accent-dark text-paper px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Iniciar
          </button>
        ) : (
          <button
            onClick={parar}
            className="border border-structural text-structural px-4 py-2 rounded-md text-sm font-medium hover:bg-structural/10 transition-colors"
          >
            Parar
          </button>
        )}

        <button
          onClick={marcarVolta}
          disabled={!rodando}
          className="bg-ink text-paper px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Marcar volta
        </button>

        <button
          onClick={zerar}
          className="border border-ink/20 text-ink-soft px-4 py-2 rounded-md text-sm font-medium hover:bg-ink/5 transition-colors"
        >
          Zerar
        </button>
      </div>

      {voltas.length > 0 && (
        <ul className="space-y-1.5">
          {voltas.map((v, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-ink/5 rounded-md px-3 py-2 text-sm text-ink"
            >
              <span>Volta {i + 1}</span>
              <span className="font-mono">{v.toFixed(1)}s</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
