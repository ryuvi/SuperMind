import React, { useRef, useState } from "react";
import { FileDrop } from "./components/FileDrop";
import { MindMap } from "./components/MindMap";
import type { MindElixirData } from "./utils/parser";
import html2canvas from "html2canvas";
import './App.css'
import { useMindStore } from "./utils/mindStore";

export const App: React.FC = () => {
  const [mapData, setMapData] = useState<MindElixirData | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { download } = useMindStore();

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = containerRef.current?.querySelector('.main-node-container') as HTMLElement;
    if (!el) return;

    html2canvas(el, {
      useCORS: true,
      backgroundColor: '#252526',
    }).then((canva) => {
      const link = document.createElement('a');
      link.download = 'mapa-mental.png';
      link.href = canva.toDataURL('image/png');
      link.click();
    });
  };

  return (
    <main
      style={{
        width: "100dvw",

        height: "100vh",
        margin: 0,
        padding: 0,
        fontFamily: "'Segoe UI', sans-serif",
        background: "#f0f2f5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "1rem",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <FileDrop onFileProcessed={setMapData} />
      </div>

      {mapData && (
        <div
          style={{
            padding: "0.5rem 1rem",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <button
            onClick={download}
            style={{
              padding: "0.75rem 1.25rem",
              fontSize: "1.1rem",
              borderRadius: "8px",
              border: "none",
              background: "#007bff",
              color: "#fff",
              cursor: "pointer",
              width: "100%",
              maxWidth: "300px",
            }}
          >
            Salvar como imagem
          </button>
        </div>
      )}

      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflow: "auto",
          padding: "1rem",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: '100dvw',
          width: '100%'
        }}
      >
        <div
          style={{
            width: "100%",
            minHeight: "300px",
            overflowX: "auto",
          }}
        >
          {mapData && <MindMap data={mapData} />}
        </div>
      </div>
    </main>
  );
};

export default App;
