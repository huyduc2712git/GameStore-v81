import { Dimensions, Platform } from 'react-native';

// Get device dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Determine if device is a tablet
const isTablet = (() => {
  const aspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
  // Tablets typically have aspect ratio < 1.6 and width > 600
  return (
    (Platform.OS === 'ios' && Platform.isPad) ||
    (SCREEN_WIDTH >= 600 && aspectRatio < 1.6)
  );
})();

// Base dimensions
// For phones: iPhone 12 Pro (390x844)
// For tablets: iPad 10.2" (810x1080 portrait)
const baseWidth = isTablet ? 810 : 390;
const baseHeight = isTablet ? 1080 : 844;

// Maximum scale limits to prevent oversized elements on large tablets
const MAX_SCALE = isTablet ? 1.3 : 1.5;
const MIN_SCALE = 0.85;

/**
 * Clamp scale value between min and max
 */
const clampScale = (value: number): number => {
  return Math.min(Math.max(value, MIN_SCALE), MAX_SCALE);
};

/**
 * Scale function for width-based scaling
 * Use for: widths, paddings, margins (horizontal)
 */
export const scale = (size: number): number => {
  const scaleRatio = SCREEN_WIDTH / baseWidth;
  const clampedRatio = clampScale(scaleRatio);
  return size * clampedRatio;
};

/**
 * Vertical scale function for height-based scaling
 * Use for: heights, paddings, margins (vertical)
 */
export const verticalScale = (size: number): number => {
  const scaleRatio = SCREEN_HEIGHT / baseHeight;
  const clampedRatio = clampScale(scaleRatio);
  return size * clampedRatio;
};

/**
 * Moderate scale function with custom factor
 * Use for: font sizes, border radius
 * Factor default is 0.5 for more subtle scaling
 * On tablets, we use even more conservative scaling (factor 0.3)
 */
export const moderateScale = (size: number, factor: number = 0.5): number => {
  const adjustedFactor = isTablet ? Math.min(factor, 0.3) : factor;
  return size + (scale(size) - size) * adjustedFactor;
};

/**
 * Scale font size with moderate scaling
 * Optimized for text readability across devices
 * On tablets, font scaling is more conservative
 */
export const scaleFont = (size: number): number => {
  return moderateScale(size, isTablet ? 0.25 : 0.3);
};

/**
 * Get scaled dimensions and device info
 */
export const scaledSize = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isTablet,
  isPhone: !isTablet,
  isSmallDevice: SCREEN_WIDTH < 375,
  isMediumDevice: SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414,
  isLargeDevice: SCREEN_WIDTH >= 414 && SCREEN_WIDTH < 600,
  isLandscape: SCREEN_WIDTH > SCREEN_HEIGHT,
  isPortrait: SCREEN_HEIGHT > SCREEN_WIDTH,
};

/**
 * Utility to check device type
 */
export const deviceType = {
  // Phone sizes
  smallPhone: SCREEN_WIDTH < 375 && !isTablet, // iPhone SE
  mediumPhone: SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414 && !isTablet, // iPhone 12/13
  largePhone: SCREEN_WIDTH >= 414 && SCREEN_WIDTH < 600 && !isTablet, // iPhone Pro Max
  // Tablet sizes
  smallTablet: SCREEN_WIDTH >= 600 && SCREEN_WIDTH < 768 && isTablet, // 7-8" tablets
  mediumTablet: SCREEN_WIDTH >= 768 && SCREEN_WIDTH < 1024 && isTablet, // iPad 10.2"
  largeTablet: SCREEN_WIDTH >= 1024 && isTablet, // iPad Pro
};

/**
 * Get responsive value based on device size
 * Supports both phone and tablet
 */
export const getResponsiveValue = <T>(
  smallPhone: T,
  mediumPhone: T,
  largePhone: T,
  tablet?: T,
): T => {
  if (isTablet && tablet !== undefined) return tablet;
  if (deviceType.smallPhone) return smallPhone;
  if (deviceType.mediumPhone) return mediumPhone;
  return largePhone;
};

/**
 * Get value based on device type (phone vs tablet)
 */
export const getDeviceValue = <T>(phoneValue: T, tabletValue: T): T => {
  return isTablet ? tabletValue : phoneValue;
};

/**
 * Responsive spacing system
 * Provides consistent spacing across all devices
 */
export const spacing = {
  xs: scale(4),
  sm: scale(8),
  md: scale(12),
  lg: scale(16),
  xl: scale(20),
  xxl: scale(24),
  xxxl: scale(32),
};

// Export screen dimensions
export { SCREEN_WIDTH, SCREEN_HEIGHT, isTablet };
