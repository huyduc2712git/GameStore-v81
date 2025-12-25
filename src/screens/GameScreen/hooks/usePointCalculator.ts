import { useState } from 'react';
import { Alert } from 'react-native';
import { gameStore } from '@stores/gameStore';

export const usePointCalculator = () => {
  const [selectedWinner, setSelectedWinner] = useState<string | null>(null);
  const [selectedDrawer, setSelectedDrawer] = useState<string | null>(null);

  const STARTING_POINTS = 5;

  const handleWinnerToggle = (playerId: string) => {
    // Check if this player is already selected as drawer
    if (selectedDrawer === playerId) {
      Alert.alert('Lỗi', 'Người hòa không thể được chọn làm người thắng');
      return;
    }

    setSelectedWinner(prev => (prev === playerId ? null : playerId));
  };

  const handleDrawerToggle = (playerId: string) => {
    // Check if this player is already selected as winner
    if (selectedWinner === playerId) {
      Alert.alert('Lỗi', 'Người thắng không thể được chọn làm người hòa');
      return;
    }

    setSelectedDrawer(prev => (prev === playerId ? null : playerId));
  };

  const getScorePreview = (playerId: string, currentScore: number) => {
    const losers = gameStore.currentPlayers
      .map(p => p.id)
      .filter(id => id !== selectedWinner && id !== selectedDrawer);
    const totalLoserPoints = losers.length * STARTING_POINTS;

    if (playerId === selectedWinner) {
      return currentScore + totalLoserPoints;
    } else if (playerId === selectedDrawer) {
      return currentScore; // No change
    } else if (selectedWinner) {
      return currentScore - STARTING_POINTS;
    }
    return currentScore;
  };

  const handleApplyResults = (onSuccess: () => void) => {
    if (!selectedWinner) {
      Alert.alert('Lỗi', 'Vui lòng chọn 1 người thắng');
      return;
    }

    if (gameStore.currentPlayers.length < 2) {
      Alert.alert('Lỗi', 'Cần ít nhất 2 người chơi');
      return;
    }

    // Get losers (everyone except winner and drawer)
    const losers = gameStore.currentPlayers
      .map(p => p.id)
      .filter(id => id !== selectedWinner && id !== selectedDrawer);

    const totalLoserPoints = losers.length * STARTING_POINTS;

    // Update each player's score
    gameStore.currentPlayers.forEach(player => {
      if (player.id === selectedWinner) {
        // Winner gets total points of all losers
        gameStore.addPlayerScore(player.id, totalLoserPoints);
      } else if (player.id === selectedDrawer) {
        // Drawer keeps their points unchanged (+0)
        // Do nothing
      } else {
        // Losers lose their starting points (can go negative)
        gameStore.addPlayerScore(player.id, -STARTING_POINTS);
      }
    });

    // Reset selections and call success callback
    resetSelections();
    onSuccess();
  };

  const resetSelections = () => {
    setSelectedWinner(null);
    setSelectedDrawer(null);
  };

  const getPlayerStatus = (playerId: string) => {
    const isWinner = selectedWinner === playerId;
    const isDrawer = selectedDrawer === playerId;
    const isLoser = selectedWinner && !isWinner && !isDrawer;

    const hasWinner = selectedWinner !== null;
    const hasDrawer = selectedDrawer !== null;
    const isWinnerDisabled = hasWinner && !isWinner;
    const isDrawerDisabled = hasDrawer && !isDrawer;

    return {
      isWinner,
      isDrawer,
      isLoser,
      isWinnerDisabled,
      isDrawerDisabled,
    };
  };

  return {
    selectedWinner,
    selectedDrawer,
    handleWinnerToggle,
    handleDrawerToggle,
    getScorePreview,
    handleApplyResults,
    resetSelections,
    getPlayerStatus,
    STARTING_POINTS,
  };
};
