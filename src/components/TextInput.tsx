import { InputTextarea } from "primereact/inputtextarea";
import { useTextStore } from "../stores/textStore";
import { parseTextToTree } from "../utils/parser";
import { useMindStore } from "../stores/mindStore";

const placeholder = `1. Título Principal
1.1 Subtítulo 1...`;

export default function TextInput() {
  const { setText, text, title } = useTextStore();
  const { setData } = useMindStore();

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    const tree = parseTextToTree(newText, title);
    setData(tree);
  };

  return (
    <div
      style={{
        width: "100%",
        marginBottom: ".75rem",
      }}
    >
      <InputTextarea
        value={text}
        onChange={handleTextChange}
        rows={5}
        cols={30}
        style={{
          width: "100%",
          boxSizing: "border-box",
          borderRadius: "10px",
          padding: "1rem",
          height: "200px",
        }}
        autoResize
        placeholder={placeholder}
      />
    </div>
  );
}
