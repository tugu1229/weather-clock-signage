import { CurrentPanel } from './components/CurrentPanel';
import { ForecastRotator } from './components/ForecastRotator';
import { useCurrentTime } from './hooks/useCurrentTime';
import { useRotatingForecast } from './hooks/useRotatingForecast';
import { useWeatherSnapshot } from './hooks/useWeatherSnapshot';
import type { CSSProperties } from 'react';

type ScreenMode = 'wide' | 'left' | 'right';

type DisplayCorrection = {
  xScale: number;
  contentWidthPercent: number;
  debug: boolean;
};

function getScreenMode(): ScreenMode {
  const mode = new URLSearchParams(window.location.search).get('screen');

  if (mode === 'left' || mode === 'right') {
    return mode;
  }

  return 'wide';
}

function getDisplayCorrection(): DisplayCorrection {
  const params = new URLSearchParams(window.location.search);
  const rawScale = Number(params.get('x') ?? '1');
  const xScale = Number.isFinite(rawScale) ? Math.min(Math.max(rawScale, 0.35), 1.2) : 1;

  return {
    xScale,
    contentWidthPercent: 100 / xScale,
    debug: params.get('debug') === '1',
  };
}

export default function App() {
  const now = useCurrentTime();
  const activeView = useRotatingForecast();
  const weather = useWeatherSnapshot();
  const screenMode = getScreenMode();
  const correction = getDisplayCorrection();
  const hasCorrection = correction.xScale !== 1;

  return (
    <main
      className={`signage-shell screen-${screenMode} ${hasCorrection ? 'has-x-correction' : ''}`}
      style={
        {
          '--signage-x-scale': correction.xScale,
          '--signage-content-width': `${correction.contentWidthPercent}%`,
        } as CSSProperties
      }
    >
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="signage-content">
        {screenMode !== 'right' && <CurrentPanel now={now} weather={weather} />}
        {screenMode !== 'left' && <ForecastRotator activeView={activeView} weather={weather} />}
        {screenMode === 'wide' && <div className="bezel-guide" aria-hidden="true" />}
      </div>
      {correction.debug && (
        <div className="debug-panel" aria-hidden="true">
          <span className="debug-circle" />
          <span>screen: {screenMode}</span>
          <span>x: {correction.xScale.toFixed(2)}</span>
          <span>w: {Math.round(correction.contentWidthPercent)}%</span>
          <span>{window.innerWidth} x {window.innerHeight}</span>
        </div>
      )}
    </main>
  );
}
