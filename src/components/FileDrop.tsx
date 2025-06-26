import React, { useRef } from 'react'
import { extractTextFromFile } from '../utils/fileLoader'
import { parseNumberedTextToTree, type MindElixirData } from '../utils/parser'

interface FileDropProps {
  onFileProcessed: (data: MindElixirData) => void
}

export const FileDrop: React.FC<FileDropProps> = ({ onFileProcessed }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (!file) return
    processFile(file)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    processFile(file)
    // Limpa para permitir selecionar o mesmo arquivo novamente se necessário
    event.target.value = ''
  }

  const processFile = (file: File) => {
    extractTextFromFile(file)
      .then(text => {
        const tree = parseNumberedTextToTree(text)
        onFileProcessed(tree)
      })
      .catch(err => alert('Erro ao processar arquivo: ' + err.message))
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  return (
    <div
      onClick={handleClick}
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
      <p>Arraste e solte seu arquivo ou clique para selecionar (.md, .txt, .docx)</p>
      <input
        type="file"
        accept=".md,.txt,.docx"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}
