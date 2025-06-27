import React, { useEffect, useRef } from "react";
import MindElixir, { type Options, type MindElixirData } from "mind-elixir";
import { useMindStore } from "../utils/mindStore";


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
      mindInstanceRef.current.refresh(data);
    } else {
      const options: Options = {
        el: containerRef.current,
        direction: MindElixir.SIDE,
        draggable: false,
        contextMenu: true,
        toolBar: true,
        keypress: false,
        mouseSelectionButton: 0,
        overflowHidden: false,
        selectionContainer: ''
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
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "auto", // ⚠️ importante: libera scroll
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <div
          ref={containerRef}
          style={{
            minWidth: "800px", // ⚠️ garante espaço inicial
            minHeight: "600px",
          }}
        />
      </div>
  );
};
