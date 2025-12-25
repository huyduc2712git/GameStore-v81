import { counterStore } from './counter.store';
import { authStore } from './authStore';
import { gameStore } from './gameStore';

export const rootStore = {
  counterStore,
  authStore,
  gameStore,
};

export type RootStore = typeof rootStore;

export { authStore, gameStore, counterStore };
