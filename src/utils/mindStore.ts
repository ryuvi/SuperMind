import { create } from "zustand";
import MindElixir from "mind-elixir";
import style from "../assets/styles.css?raw";
import katex from "../assets/katex.css?raw";

interface MindStore {
  instance: InstanceType<typeof MindElixir>;
  setInstance: (instance: InstanceType<typeof MindElixir>) => void;
  download: () => void;
}

export const useMindStore = create<MindStore>((set, get) => ({
  instance: new MindElixir({
    el: document.createElement("div"),
    direction: MindElixir.SIDE,
    draggable: true,
    contextMenu: true,
    toolBar: true,
    keypress: true,
    mouseSelectionButton: 0,
  }),
  setInstance: (instance: InstanceType<typeof MindElixir>) => set({ instance }),
  download: async () => {
    if (!get().instance) return;
    try {
      const blob = await get().instance.exportPng(false, style + katex);
      const url = URL.createObjectURL(blob as Blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "mapa-mental.png";
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Não foi possível salvar a imagem.");
    }
  },
}));
