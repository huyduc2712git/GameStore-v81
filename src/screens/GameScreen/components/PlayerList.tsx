import { moderateScale, scaleFont, verticalScale } from '@utils/scale';
import { FontFamily, FontWeight } from '@utils/typography';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { gameStore } from '@stores/gameStore';
import { Images } from '@assets/images';

interface PlayerListProps {}

const MAX_PLAYERS = 6;

// Gradient colors based on rank
const RANK_GRADIENTS = [
  ['#FF6B6B', '#FF8E8E'], // 1st - Red gradient
  ['#4ECDC4', '#95E1D3'], // 2nd - Teal gradient
  ['#45B7D1', '#87CEEB'], // 3rd - Blue gradient
  ['#FFA07A', '#FFB88C'], // 4th - Orange gradient
  ['#98D8C8', '#B4E7D8'], // 5th - Green gradient
  ['#C7CEEA', '#E0E6F8'], // 6th - Purple gradient
];

export const PlayerList = observer((props: PlayerListProps) => {
  // Sort players by score descending
  const sortedPlayers = gameStore.currentPlayers
    .slice()
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_PLAYERS); // Limit to max 6 players

  if (sortedPlayers.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🎮</Text>
        <Text style={styles.emptyText}>Chưa có người chơi nào</Text>
        <Text style={styles.emptySubText}>
          Nhấn "Add player" để thêm người chơi mới
        </Text>
      </View>
    );
  }

  const renderPlayerCard = (item: any, index: number) => {
    const gradientColors = RANK_GRADIENTS[index % RANK_GRADIENTS.length];
    const initial = item.name.charAt(0).toUpperCase();
    const hasAvatar = item.avatar && item.avatar.trim().length > 0;

    const rankLabel = `#${Math.floor(Math.random() * 100000)}`;

    return (
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        key={item.id}
        style={styles.cardWrapper}
      >
        <View
          style={{
            width: '100%',
            padding: verticalScale(6),
            gap: verticalScale(12),
          }}
        >
          <View style={styles.avatarContainer}>
            {hasAvatar ? (
              <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{initial}</Text>
              </View>
            )}
          </View>
          <View style={styles.tagRank}>
            <Text style={styles.playerName}>{`${item.name}`}</Text>
            {item.description && item.description.trim().length > 0 && (
              <Text style={styles.discription}>- {item.description} -</Text>
            )}
          </View>
          <View style={styles.infoSection}>
            <View style={styles.scoreBadge}>
              <Text style={styles.avgEarningsText}>{'Avg earnings'}</Text>
              <Text style={styles.scoreText}>{item.score} PTS</Text>
            </View>
            <TouchableOpacity onPress={() => gameStore.removePlayer(item.id)}>
              <Image
                source={Images.ic_delete_image}
                style={styles.removeButtonImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Người chơi ({sortedPlayers.length}/{MAX_PLAYERS})
        </Text>
        {sortedPlayers.length > 0 && (
          <TouchableOpacity onPress={() => gameStore.clearAllScores()}>
            <Image
              source={Images.ic_restart}
              style={styles.restartButtonImage}
            />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={sortedPlayers}
        renderItem={({ item, index }) => renderPlayerCard(item, index)}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  headerTitle: {
    fontSize: scaleFont(16),
    fontFamily: FontFamily.bold,
    color: '#1a1a1a',
  },
  clearButton: {
    paddingHorizontal: verticalScale(12),
    paddingVertical: verticalScale(6),
    backgroundColor: '#ff3b30',
    borderRadius: moderateScale(6),
  },
  clearButtonText: {
    fontSize: scaleFont(12),
    fontFamily: FontFamily.medium,
    color: '#ffffff',
  },
  contentContainerStyle: {
    gap: verticalScale(12),
  },
  columnWrapper: {
    gap: verticalScale(12),
  },
  cardWrapper: {
    flex: 1,
    borderRadius: moderateScale(16),
    overflow: 'hidden',
    // backgroundColor: '#121319',
    alignItems: 'center',
    // padding: verticalScale(6),
    // gap: verticalScale(12),
  },
  tagRank: {
    borderColor: '#ffffff',
    width: '100%',
    gap: verticalScale(2),
  },
  discription: {
    fontSize: scaleFont(14),
    fontFamily: FontFamily.regular,
    color: '#FFFFFF',
  },
  avgEarningsText: {
    fontSize: scaleFont(12),
    fontFamily: FontFamily.fredokaBold,
    color: '#c4c6ce',
  },
  playerName: {
    fontSize: scaleFont(20),
    fontFamily: FontFamily.fredokaSemiBold,
    color: '#ffffff',
  },
  restartButtonImage: {
    width: moderateScale(32),
    height: moderateScale(32),
  },
  playerNameView: {
    borderWidth: moderateScale(2),
    borderColor: '#121319',
    borderTopWidth: 0,
    borderBottomLeftRadius: moderateScale(12),
    borderBottomRightRadius: moderateScale(12),
    position: 'absolute',
    top: 0,
    width: verticalScale(100),
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: verticalScale(6),
    padding: verticalScale(2),
  },
  removeButtonImage: {
    width: moderateScale(28),
    height: moderateScale(28),
  },
  removeButtonText: {
    fontSize: scaleFont(20),
    color: '#666666',
    lineHeight: scaleFont(20),
    fontWeight: 'bold',
  },
  rankBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: verticalScale(12),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(20),
    marginBottom: verticalScale(12),
  },
  rankBadgeText: {
    fontSize: scaleFont(10),
    fontFamily: FontFamily.bold,
    fontWeight: FontWeight.bold,
    color: '#1a1a1a',
    textTransform: 'uppercase',
  },
  avatarContainer: {
    width: '100%',
    height: verticalScale(180),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    // borderRadius: moderateScale(40),
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  avatarText: {
    fontSize: scaleFont(32),
    fontFamily: FontFamily.fredokaSemiBold,
    color: '#ffffff',
  },
  scoreBadge: {
    gap: verticalScale(6),
  },
  scoreText: {
    fontSize: scaleFont(16),
    fontFamily: FontFamily.fredokaSemiBold,
    color: '#f6b246',
  },
  infoSection: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(10),
    padding: verticalScale(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: verticalScale(4),
  },
  levelDot: {
    fontSize: scaleFont(8),
    color: '#4ade80',
  },
  levelText: {
    fontSize: scaleFont(10),
    fontFamily: FontFamily.medium,
    fontWeight: FontWeight.medium,
    color: '#ffffff',
    letterSpacing: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(60),
  },
  emptyIcon: {
    fontSize: scaleFont(48),
    marginBottom: verticalScale(16),
  },
  emptyText: {
    fontSize: scaleFont(18),
    fontFamily: FontFamily.bold,
    fontWeight: FontWeight.bold,
    color: '#1a1a1a',
    marginBottom: verticalScale(8),
  },
  emptySubText: {
    fontSize: scaleFont(14),
    fontFamily: FontFamily.regular,
    color: '#666666',
    textAlign: 'center',
  },
});
