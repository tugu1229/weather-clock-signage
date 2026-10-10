import type { ForecastView } from './types';

export const signageConfig = {
  regionName: '横浜',
  regionPrefecture: '神奈川県',
  coordinates: {
    latitude: 35.4437,
    longitude: 139.638,
  },
  rotationIntervalMs: 15_000,
  fadeDurationMs: 600,
  weatherRefreshIntervalMs: 30 * 60 * 1_000,
  forecastViewOrder: ['hourly', 'weekly', 'tomorrow'] satisfies ForecastView[],
  baseScreen: {
    width: 3840,
    height: 1080,
    aspectRatio: '32 / 9',
  },
};
