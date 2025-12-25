import AsyncStorage from '@react-native-async-storage/async-storage';
import { types, flow, Instance, SnapshotOut } from 'mobx-state-tree';
import { persist } from 'mst-persist';
import { PlayerModel } from './player.model';

const MAX_PLAYERS = 6;

export const GameStore = types
  .model('GameStore', {
    availablePlayers: types.array(PlayerModel),
    currentPlayers: types.array(PlayerModel),
    isHydrated: types.optional(types.boolean, false),
  })
  .views(self => ({
    get canAddPlayer() {
      return self.currentPlayers.length < MAX_PLAYERS;
    },
    get remainingSlots() {
      return MAX_PLAYERS - self.currentPlayers.length;
    },
  }))
  .actions(self => ({
    setHydrated(hydrated: boolean) {
      self.isHydrated = hydrated;
    },
    // Available Players Management
    addAvailablePlayer(player: {
      id: string;
      name: string;
      score?: number;
      avatar?: string;
      description?: string;
    }) {
      const newPlayer = {
        id: player.id,
        name: player.name,
        score: player.score || 0,
        avatar: player.avatar || '',
        description: player.description || '',
      };
      self.availablePlayers.push(newPlayer);
    },
    removeAvailablePlayer(playerId: string) {
      const index = self.availablePlayers.findIndex(p => p.id === playerId);
      if (index !== -1) {
        self.availablePlayers.splice(index, 1);
      }
    },
    clearAllAvailablePlayers() {
      self.availablePlayers.clear();
    },
    updateAvailablePlayerScore(playerId: string, newScore: number) {
      const player = self.availablePlayers.find(p => p.id === playerId);
      if (player) {
        player.updateScore(newScore);
      }
    },

    // Current Game Players Management
    addPlayer(player: {
      id: string;
      name: string;
      score?: number;
      avatar?: string;
      description?: string;
    }) {
      // Check if max players reached
      if (self.currentPlayers.length >= MAX_PLAYERS) {
        return false;
      }

      const newPlayer = {
        id: player.id,
        name: player.name,
        score: player.score || 0,
        avatar: player.avatar || '',
        description: player.description || '',
      };
      self.currentPlayers.push(newPlayer);
      return true;
    },
    removePlayer(playerId: string) {
      const index = self.currentPlayers.findIndex(p => p.id === playerId);
      if (index !== -1) {
        self.currentPlayers.splice(index, 1);
      }
    },
    clearAllPlayers() {
      self.currentPlayers.clear();
    },
    updatePlayerScore(playerId: string, newScore: number) {
      const player = self.currentPlayers.find(p => p.id === playerId);
      if (player) {
        player.updateScore(newScore);
      }
    },
    addPlayerScore(playerId: string, points: number) {
      const player = self.currentPlayers.find(p => p.id === playerId);
      if (player) {
        player.addScore(points);
      }
    },
    clearAllScores() {
      self.currentPlayers.forEach(player => player.resetScore());
    },
  }));

export interface IGameStore extends Instance<typeof GameStore> {}
export interface GameStoreSnapshot extends SnapshotOut<typeof GameStore> {}

// Create store instance
export const gameStore = GameStore.create({
  availablePlayers: [],
  currentPlayers: [],
  isHydrated: false,
});

// Persist configuration
persist('gameStore', gameStore, {
  storage: AsyncStorage,
  jsonify: true,
  whitelist: ['availablePlayers', 'currentPlayers'],
}).then(() => {
  gameStore.setHydrated(true);
});
