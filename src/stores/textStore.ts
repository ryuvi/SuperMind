import { create } from 'zustand'

interface TextStore {
    text: string,
    title: string,
    setText: (text: string) => void
    setTitle: (title: string) => void
}

export const useTextStore = create<TextStore>((set) => ({
    text: '',
    title: 'Mapa Mental',
    setText: (text: string) => set({ text }),
    setTitle: (title: string) => set({ title }),
}))

