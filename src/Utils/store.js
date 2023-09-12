import { create } from "zustand";

const useColorStore = create((set) => ({
  colors: {
    "Hull Color": "#000000",
    "Power Poles": "#000000",
    "Poling Platform": "#000000",
  },
  activeState: 0,
  setInitialColors: (colors) =>
    set((state) => ({
      colors: colors,
    })),
  setColors: (color) =>
    set((state) => ({
      colors: {
        ...state.colors,
        [color.part]: color.hex,
      },
    })),
  setActiveState: (activeState) =>
    set((state) => ({
      activeState: activeState,
    })),
}));

export default useColorStore;
