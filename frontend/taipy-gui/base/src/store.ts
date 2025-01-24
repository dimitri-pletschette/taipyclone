import { create } from "zustand";

interface TaipyGuiBaseState {
    jsx: string;
    module: string;
    setJsx: (newJsx: string) => void;
    setModule: (newModule: string) => void;
}

const useStore = create<TaipyGuiBaseState>()((set) => ({
    jsx: "",
    module: "",
    setJsx: (newJsx: string) => set(() => ({ jsx: newJsx })),
    setModule: (newModule: string) => set(() => ({ module: newModule })),
}));

export default useStore;
