"use client";

import type { Tolerancias, ParametrosLinha } from "../types/cronoanalise";

interface Props {
  tolerancias: Tolerancias;
  onToleranciasChange: (t: Tolerancias) => void;
  parametrosLinha: ParametrosLinha;
  onParametrosLinhaChange: (p: ParametrosLinha) => void;
}

export default function ParametrosPanel({
  tolerancias,
  onToleranciasChange,
  parametrosLinha,
  onParametrosLinhaChange,
}: Props) {
    return (
    <div className="border-l-2 border-structural/40 pl-6">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-mono text-xs text-structural">03</span>
        <h2 className="text-sm font-semibold text-ink">Tolerâncias e demanda</h2>
      </div>
      <p className="text-xs text-ink-soft/70 mb-4">
        Tolerâncias cobrem pausas pessoais, fadiga e esperas do processo. Demanda e tempo disponível definem o takt time da linha.
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        <Campo id="tolerancia-pessoais" label="Pessoais (%)" value={tolerancias.pessoais}
          onChange={(v) => onToleranciasChange({ ...tolerancias, pessoais: v })} />
        <Campo id="tolerancia-fadiga" label="Fadiga (%)" value={tolerancias.fadiga}
          onChange={(v) => onToleranciasChange({ ...tolerancias, fadiga: v })} />
        <Campo id="tolerancia-especiais" label="Especiais (%)" value={tolerancias.especiais}
          onChange={(v) => onToleranciasChange({ ...tolerancias, especiais: v })} />
        <Campo id="demanda" label="Demanda (unid.)" value={parametrosLinha.demanda}
          onChange={(v) => onParametrosLinhaChange({ ...parametrosLinha, demanda: v })} />
        <Campo id="tempo-disponivel" label="T. disponível (min)" value={parametrosLinha.tempoDisponivelMin}
          onChange={(v) => onParametrosLinhaChange({ ...parametrosLinha, tempoDisponivelMin: v })} />
      </div>
    </div>
  );
}

function Campo({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs text-ink-soft">
      {label}
      <input
        id={id}
        name={id}
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="border border-ink/15 bg-paper rounded-md px-2 py-1.5 text-sm font-mono text-ink outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
      />
    </label>
  );
}
