import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const PlayerModel = types
  .model('Player', {
    id: types.identifier,
    name: types.string,
    score: types.optional(types.number, 0),
    avatar: types.optional(types.string, ''),
    description: types.optional(types.string, ''),
  })
  .actions(self => ({
    updateScore(newScore: number) {
      self.score = newScore;
    },
    addScore(points: number) {
      self.score += points;
    },
    resetScore() {
      self.score = 0;
    },
  }));

export interface Player extends Instance<typeof PlayerModel> {}
export interface PlayerSnapshot extends SnapshotOut<typeof PlayerModel> {}
