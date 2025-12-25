/**
 * Typography System
 * TikTok Sans font family configuration with responsive scaling
 */

import { scaleFont } from './scale';

export const FontFamily = {
  // Regular weight
  regular: 'TikTokSans-Regular',
  // Medium weight
  medium: 'TikTokSans-Medium',
  // Semi Bold weight
  semiBold: 'TikTokSans-SemiBold',
  // Bold weight
  bold: 'TikTokSans-Bold',
  // Light weight
  light: 'TikTokSans-Light',
  // Extra Bold weight
  extraBold: 'TikTokSans-ExtraBold',
};

export const FontWeight = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
};

export const Typography = {
  // Display styles
  displayLarge: {
    fontFamily: FontFamily.bold,
    fontSize: scaleFont(32),
    lineHeight: scaleFont(40),
  },
  displayMedium: {
    fontFamily: FontFamily.bold,
    fontSize: scaleFont(28),
    lineHeight: scaleFont(36),
  },
  displaySmall: {
    fontFamily: FontFamily.semiBold,
    fontSize: scaleFont(24),
    lineHeight: scaleFont(32),
  },

  // Heading styles
  h1: {
    fontFamily: FontFamily.bold,
    fontSize: scaleFont(24),
    lineHeight: scaleFont(32),
  },
  h2: {
    fontFamily: FontFamily.semiBold,
    fontSize: scaleFont(20),
    lineHeight: scaleFont(28),
  },
  h3: {
    fontFamily: FontFamily.semiBold,
    fontSize: scaleFont(18),
    lineHeight: scaleFont(24),
  },
  h4: {
    fontFamily: FontFamily.medium,
    fontSize: scaleFont(16),
    lineHeight: scaleFont(22),
  },

  // Body styles
  bodyLarge: {
    fontFamily: FontFamily.regular,
    fontSize: scaleFont(16),
    lineHeight: scaleFont(24),
  },
  bodyMedium: {
    fontFamily: FontFamily.regular,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(20),
  },
  bodySmall: {
    fontFamily: FontFamily.regular,
    fontSize: scaleFont(12),
    lineHeight: scaleFont(16),
  },

  // Label styles
  labelLarge: {
    fontFamily: FontFamily.medium,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(20),
  },
  labelMedium: {
    fontFamily: FontFamily.medium,
    fontSize: scaleFont(12),
    lineHeight: scaleFont(16),
  },
  labelSmall: {
    fontFamily: FontFamily.medium,
    fontSize: scaleFont(10),
    lineHeight: scaleFont(14),
  },

  // Button styles
  button: {
    fontFamily: FontFamily.semiBold,
    fontSize: scaleFont(16),
    lineHeight: scaleFont(24),
  },
  buttonSmall: {
    fontFamily: FontFamily.medium,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(20),
  },

  // Caption
  caption: {
    fontFamily: FontFamily.regular,
    fontSize: scaleFont(12),
    lineHeight: scaleFont(16),
  },
};

// Helper function to get font style with scaled size
export const getFont = (
  weight: keyof typeof FontFamily = 'regular',
  size: number = 14,
) => ({
  fontFamily: FontFamily[weight],
  fontSize: scaleFont(size),
});
