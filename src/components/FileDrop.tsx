import React from 'react'
import { extractTextFromFile } from '../utils/fileLoader'
import { parseNumberedTextToTree, type MindElixirData } from '../utils/parser'

interface FileDropProps {
  onFileProcessed: (data: MindElixirData) => void
}

export const FileDrop: React.FC<FileDropProps> = ({ onFileProcessed }) => {
  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (!file) return

    extractTextFromFile(file)
      .then(text => {
        const tree = parseNumberedTextToTree(text)
        onFileProcessed(tree)
      })
      .catch(err => alert('Erro ao processar arquivo: ' + err.message))
  }

  return (
    <div
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
      style={{
        border: '2px dashed #999',
        padding: '2rem',
        textAlign: 'center',
        margin: '1rem',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        cursor: 'pointer',
        color: '#999',
      }}
    >
      <p>Arraste e solte seu arquivo (.md, .txt, .docx)</p>
    </div>
  )
}
