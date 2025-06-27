import React, { useRef } from "react";
import { FileDrop } from "./components/FileDrop";
import { MindMap } from "./components/MindMap";
import './App.css'
import { useMindStore } from "./stores/mindStore";
import TextInput from "./components/TextInput";
import { PrimeReactProvider } from 'primereact/api'
import Title from "./components/Title";
import { useTextStore } from "./stores/textStore";

export const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { download, data: mapData } = useMindStore();
  const { title } = useTextStore()

  return (
    <PrimeReactProvider>
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
          <Title />
          <TextInput />
          <FileDrop  />
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
              onClick={() => download(title.toLowerCase().split(' ').join('_'))}
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
    </PrimeReactProvider>
  );
};

export default App;
