import { useTextStore } from "../stores/textStore";

export default function Title() {
  const { title, setTitle } = useTextStore();

  return (
    <div className="w-full mb-4">
      <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
        Título do mapa mental
      </label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Digite o título do seu mapa mental..."
        className={`
          w-full p-4 rounded-xl border border-gray-300 
          focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
          transition duration-150 ease-in-out
          text-gray-800 placeholder-gray-400
        `}
      />
    </div>
  );
}
