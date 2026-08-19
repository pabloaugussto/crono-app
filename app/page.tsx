"use client";

import { useState } from "react";
import type { Posto, Elemento } from "../types/cronoanalise";
import PostosPanel from "../components/PostosPanel";
import ElementosPanel from "../components/ElementosPanel";

export default function Home() {
  const [postos, setPostos] = useState<Posto[]>([]);
  const [elementos, setElementos] = useState<Elemento[]>([]);

  return (
    <div>
      <h1>Crono App</h1>
      <PostosPanel postos={postos} onChange={setPostos} />
      <ElementosPanel postos={postos} elementos={elementos} onChange={setElementos} />
    </div>
  );
}