import React, { useEffect, useRef } from "react";
import MindElixir, { type Options, type MindElixirData } from "mind-elixir";
import { useMindStore } from "../stores/mindStore";

interface MindMapProps {
  data: MindElixirData;
}

export const MindMap: React.FC<MindMapProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mindInstanceRef = useRef<InstanceType<typeof MindElixir> | null>(null);
  const { setInstance } = useMindStore();

  useEffect(() => {
    if (!containerRef.current) return;

    if (mindInstanceRef.current) {
      // Atualiza o mapa com novos dados
      mindInstanceRef.current.refresh(data);
    } else {
      // Inicializa novo mapa
      const options: Options = {
        el: containerRef.current,
        direction: MindElixir.SIDE,
        draggable: false,
        contextMenu: true,
        toolBar: true,
        keypress: false,
        mouseSelectionButton: 2,
        overflowHidden: false,
        selectionContainer: '',
      };

      const mind = new MindElixir(options);
      mind.init(data);
      mind.el.onmousedown = null;
      mind.container.style.touchAction = "none";
      mindInstanceRef.current = mind;
      setInstance(mind);
    }
  }, [data]);

  return (
    <div className="w-full h-full overflow-auto border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none">
      <div
        ref={containerRef}
        className="min-w-[800px] min-h-[600px]"
      />
    </div>
  );
};
