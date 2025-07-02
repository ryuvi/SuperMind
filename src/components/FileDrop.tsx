import React, { useRef } from 'react';
import { extractTextFromFile } from '../utils/fileLoader';
import { parseTextToTree } from '../utils/parser';
import { useMindStore } from '../stores/mindStore';
import { useTextStore } from '../stores/textStore';

export const FileDrop = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setData } = useMindStore();
  const { title } = useTextStore();

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
    event.target.value = '';
  };

  const processFile = (file: File) => {
    extractTextFromFile(file)
      .then(text => {
        const tree = parseTextToTree(text, title);
        setData(tree);
      })
      .catch(err => alert('Erro ao processar arquivo: ' + err.message));
  };

  const handleClick = () => inputRef.current?.click();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="w-full h-[75px] border-2 border-dashed border-gray-400 rounded-xl 
                 bg-gray-50 text-gray-500 flex items-center justify-center text-center 
                 cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 
                 focus:ring-blue-300 transition-colors"
    >
      <p className="text-sm px-4">
        Arraste e solte seu arquivo ou clique para selecionar <br />
        <span className="text-xs text-gray-400">(.md, .txt, .docx)</span>
      </p>
      <input
        type="file"
        accept=".md,.txt,.docx"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
