"use client";

import { useState } from "react";
import type { Posto } from "../types/cronoanalise";
import PostosPanel from "../components/PostosPanel";

export default function Home() {
  const [postos, setPostos] = useState<Posto[]>([]);

  return (
    <div>
      <h1>Crono App</h1>
      <PostosPanel postos={postos} onChange={setPostos} />
    </div>
  );
}