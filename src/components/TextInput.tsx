import { useTextStore } from "../stores/textStore";
import { parseTextToTree } from "../utils/parser";
import { useMindStore } from "../stores/mindStore";
import type { ChangeEvent } from "react";

const placeholder = `1. Título Principal
1.1 Subtítulo 1...`;

export default function TextInput() {
  const { setText, text, title } = useTextStore();
  const { setData } = useMindStore();

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    const tree = parseTextToTree(newText, title);
    setData(tree);
  };

  return (
    <div className="w-full mb-4">
      <label htmlFor="textarea" className="block mb-2 text-sm font-medium text-gray-700">
        Conteúdo do mapa
      </label>
      <textarea
        id="textarea"
        value={text}
        onChange={handleTextChange}
        placeholder={placeholder}
        rows={8}
        className={`
          w-full h-[200px] p-4 rounded-xl 
          border border-gray-300 
          focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
          transition duration-150 ease-in-out 
          text-gray-800 placeholder-gray-400 resize-none
        `}
      />
    </div>
  );
}
