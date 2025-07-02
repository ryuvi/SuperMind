import React, { useRef, useState } from "react";
import { FileDrop } from "./components/FileDrop";
import { MindMap } from "./components/MindMap";
import { useMindStore } from "./stores/mindStore";
import TextInput from "./components/TextInput";
import Title from "./components/Title";
import { useTextStore } from "./stores/textStore";
import './App.css'

type TabType = "text" | "file";

const tabs: { id: TabType; label: string }[] = [
  { id: "text", label: "Escrever Texto" },
  { id: "file", label: "Enviar Arquivo" },
];

export const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { download, data: mapData } = useMindStore();
  const { title } = useTextStore();

  const [activeTab, setActiveTab] = useState<TabType>("file");

  // Função que formata o nome do arquivo para download
  const formatFileName = (title: string) =>
    title.toLowerCase().trim().replace(/\s+/g, "_");

  return (
    <main className="w-screen h-screen p-4 pt-5 font-sans bg-gray-100 flex flex-col">
      {/* Versão fixa no canto superior */}
      <small className="fixed top-0 right-0 text-sm text-gray-400 pr-4 select-none pointer-events-none">
        v1.4.0
      </small>

      <div className="p-4 w-full box-border space-y-4">
        <Title />

        {/* Tabs de navegação */}
        <div
          role="tablist"
          aria-label="Editor Tabs"
          className="flex mb-4 border-b border-gray-300 bg-white rounded"
        >
          {tabs.map(({ id, label }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${id}`}
                id={`tab-${id}`}
                onClick={() => setActiveTab(id)}
                className={`cursor-pointer px-5 py-2 -mb-px font-semibold transition-colors focus:outline-none ${
                  isActive
                    ? "border-b-4 border-blue-600 text-gray-900 bg-white"
                    : "border-b-4 border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-400 bg-white"
                }`}
                tabIndex={isActive ? 0 : -1}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Conteúdo das abas */}
        {activeTab === "text" && (
          <section
            id="tabpanel-text"
            role="tabpanel"
            aria-labelledby="tab-text"
            tabIndex={0}
          >
            <TextInput />
          </section>
        )}

        {activeTab === "file" && (
          <section
            id="tabpanel-file"
            role="tabpanel"
            aria-labelledby="tab-file"
            tabIndex={0}
          >
            <FileDrop />
          </section>
        )}
      </div>

      {/* Botão para salvar o mapa mental como imagem */}
      {mapData && (
        <div className="px-4 pb-4 flex justify-center w-full box-border">
          <button
            type="button"
            onClick={() => download(formatFileName(title))}
            className="px-5 py-3 text-lg rounded-lg bg-blue-600 text-white cursor-pointer w-full max-w-xs hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            aria-label="Salvar mapa mental como imagem"
          >
            Salvar como imagem
          </button>
        </div>
      )}

      {/* Container para o mapa mental */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-4 box-border flex justify-center items-center w-full max-w-screen"
      >
        <div className="w-full min-h-[300px] overflow-x-auto">
          {mapData && <MindMap data={mapData} />}
        </div>
      </div>
    </main>
  );
};

export default App;
