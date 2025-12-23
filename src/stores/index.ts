import { counterStore } from "./counter.store";

export const rootStore = {
  counterStore,
};

export type RootStore = typeof rootStore;
