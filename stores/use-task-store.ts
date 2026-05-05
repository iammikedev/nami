import { create } from "zustand";

type TaskFilter = "all" | "open" | "done";

type TaskStore = {
  draftTitle: string;
  filter: TaskFilter;
  setDraftTitle: (title: string) => void;
  setFilter: (filter: TaskFilter) => void;
  resetDraftTitle: () => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  draftTitle: "",
  filter: "all",
  setDraftTitle: (title) => set({ draftTitle: title }),
  setFilter: (filter) => set({ filter }),
  resetDraftTitle: () => set({ draftTitle: "" }),
}));

export type { TaskFilter };
