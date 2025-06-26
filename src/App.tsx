import React, { useRef, useState } from "react";
import { FileDrop } from "./components/FileDrop";
import { MindMap } from "./components/MindMap";
import type { MindElixirData } from "./utils/parser";
import html2canvas from "html2canvas";

export const App: React.FC = () => {
  const [mapData, setMapData] = useState<MindElixirData | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleSave = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const el = containerRef.current?.querySelector('.main-node-container') as HTMLElement
    console.log(el)
    if (!el) return

    html2canvas(el, {
      useCORS: true,
      backgroundColor: '#252526',
    }).then((canva) => {
      const link = document.createElement('a')
      link.download = 'mapa-mental.png'
      link.href = canva.toDataURL('image/png')
      link.click()
    })
  }

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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <button onClick={handleSave}>Salvar</button>
      </div>
      <div ref={containerRef} style={{ flex: 1, overflow: "hidden", padding: '1rem' }}>
        {mapData && <MindMap data={mapData} />}
      </div>
    </main>
  );
};

export default App;
