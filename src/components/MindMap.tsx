import React, { useEffect, useRef } from 'react'
import MindElixir, { type Options, type MindElixirData } from 'mind-elixir'

interface MindMapProps {
  data: MindElixirData
}

export const MindMap: React.FC<MindMapProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mindInstanceRef = useRef<MindElixir | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    if (mindInstanceRef.current) {
      mindInstanceRef.current.refresh(data)
    } else {
      const options: Options = {
        el: containerRef.current,
        direction: MindElixir.SIDE, // ou: MindElixir.SIDE as Options['direction']
      }

      const mind = new MindElixir(options)
      mind.init(data)
      mindInstanceRef.current = mind
    }
  }, [data])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        overflow: 'hidden', // EVITA ultrapassagem
      }}
    />
  )
}
