import { create } from "zustand";
import MindElixir, { type MindElixirData } from "mind-elixir";
import style from "../assets/styles.css?raw";
import katex from "../assets/katex.css?raw";

interface MindStore {
  instance: InstanceType<typeof MindElixir>;
  data: MindElixirData | null;
  setInstance: (instance: InstanceType<typeof MindElixir>) => void;
  setData: (data: MindElixirData) => void;
  download: (title: string) => void;
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
  data: null,
  setInstance: (instance: InstanceType<typeof MindElixir>) => set({ instance }),
  setData: (data: MindElixirData) => set({ data }),
  download: async (title: string) => {
    if (!get().instance) return;
    try {
      const blob = await get().instance.exportPng(false, style + katex);
      const url = URL.createObjectURL(blob as Blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.png`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Não foi possível salvar a imagem.");
    }
  },
}));
