import React, { useRef, useState } from "react";
import { FileDrop } from "./components/FileDrop";
import { MindMap } from "./components/MindMap";
import { useMindStore } from "./stores/mindStore";
import TextInput from "./components/TextInput";
import Title from "./components/Title";
import { useTextStore } from "./stores/textStore";

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

  const formatFileName = (title: string) =>
    title.toLowerCase().trim().replace(/\s+/g, "_");

  document.addEventListener('touchstart', e => {
    console.log('touchstart:', e);
  });

  return (
    <main className="w-screen min-h-screen p-4 pt-5 font-sans bg-gray-100 flex flex-col">
      <small className="fixed top-0 right-0 text-sm text-gray-400 pr-4 select-none pointer-events-none">
        v1.4.0
      </small>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden rounded shadow bg-white">
        {/* Sidebar ocupa toda altura no mobile */}
        <aside
          className="
            w-full
            md:w-auto md:max-w-sm
            border-b md:border-b-0 md:border-r border-gray-300
            p-4 flex flex-col space-y-4
            overflow-auto
            h-[75dvh] md:h-auto
          "
        >
          <Title />

          <div
            role="tablist"
            aria-label="Editor Tabs"
            className="flex mb-4 border-b border-gray-300"
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

          <div className="flex-1 overflow-auto" style={{ minHeight: 0 }}>
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

          {mapData && (
            <button
              type="button"
              onClick={() => download(formatFileName(title))}
              className="mt-4 px-5 py-3 text-lg rounded-lg bg-blue-600 text-white cursor-pointer w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
              aria-label="Salvar mapa mental como imagem"
            >
              Salvar como imagem
            </button>
          )}
        </aside>

        {/* Mapa mental abaixo da sidebar no mobile, lado a lado no desktop */}
        <section
          ref={containerRef}
          className="w-full md:flex-1 md:overflow-auto md:p-4 flex justify-center items-center"
          style={{
            height: "100dvh",
            overflow: "auto",
            minHeight: 0,
          }}
        >
          <div className="w-full min-h-[300px] overflow-x-auto">
            {mapData ? (
              <MindMap data={mapData} />
            ) : (
              <p className="text-gray-400 text-center">Mapa mental vazio</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default App;
