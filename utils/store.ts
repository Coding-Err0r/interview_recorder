import { create } from "zustand";

type TimerStore = {
  isRunning: boolean;
  id: string;
  setIsRunning: (isOpen: boolean) => void;
  setId: (id: string) => void;
  start: boolean;
  setStart: (start: boolean) => void;
};

export const useTimerStore = create<TimerStore>((set) => ({
  isRunning: false,
  id: "",
  setIsRunning: (isRunning: boolean) => set({ isRunning: isRunning }),
  setId: (id: string) => set({ id: id }),
  start: false,
  setStart: (start: boolean) => set({ start: start }),
}));
