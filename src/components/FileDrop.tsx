import React, { useRef } from 'react'
import { extractTextFromFile } from '../utils/fileLoader'
import { parseTextToTree } from '../utils/parser'
import { useMindStore } from '../stores/mindStore'
import { useTextStore } from '../stores/textStore'

export const FileDrop = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { setData } = useMindStore()
  const { title } = useTextStore()

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
        const tree = parseTextToTree(text, title)
        setData(tree)
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
        // padding: '2rem',
        textAlign: 'center',
        // margin: '1rem',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        cursor: 'pointer',
        color: '#999',
        height: '75px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
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
