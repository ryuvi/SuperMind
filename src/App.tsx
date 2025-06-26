import React, { useState } from "react";
import { FileDrop } from "./components/FileDrop";
import { MindMap } from "./components/MindMap";
import type { MindElixirData } from "./utils/parser";

export const App: React.FC = () => {
  const [mapData, setMapData] = useState<MindElixirData | null>(null);

  return (
    <main
      style={{
        width: "100dvw",
        height: "100dvh",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        fontFamily: "sans-serif",
        background: "#f0f2f5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "1rem" }}>
        <FileDrop onFileProcessed={setMapData} />
      </div>
      <div style={{ flex: 1, overflow: "hidden", padding: '1rem' }}>
        {mapData && <MindMap data={mapData} />}
      </div>
    </main>
  );
};

export default App;
