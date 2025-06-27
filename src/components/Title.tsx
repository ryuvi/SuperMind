import { InputText } from 'primereact/inputtext';
import { useTextStore } from "../stores/textStore";

export default function Title() {
  const { title, setTitle } = useTextStore();
  return (
    <div
      style={{
        width: "100%",
        marginBottom: ".75rem",
      }}
    >
      <InputText
        placeholder="O título do seu mapa mental..."
        value={title}
        style={{
            width: '100%',
            boxSizing: 'border-box',
            borderRadius: '10px',
            padding: '1rem',
        }}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
}
