import { useEffect, useMemo, useState } from 'react';
import { signageConfig } from '../config';
import type { ForecastView } from '../types';

export function useRotatingForecast(): ForecastView {
  const views = useMemo(() => signageConfig.forecastViewOrder, []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const rotate = () => {
      setIndex((currentIndex) => (currentIndex + 1) % views.length);
    };

    const intervalId = window.setInterval(rotate, signageConfig.rotationIntervalMs);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setIndex((currentIndex) => currentIndex % views.length);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [views]);

  return views[index];
}
