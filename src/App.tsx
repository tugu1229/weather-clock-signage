import { CurrentPanel } from './components/CurrentPanel';
import { ForecastRotator } from './components/ForecastRotator';
import { useCurrentTime } from './hooks/useCurrentTime';
import { useRotatingForecast } from './hooks/useRotatingForecast';
import { useWeatherSnapshot } from './hooks/useWeatherSnapshot';

type ScreenMode = 'wide' | 'left' | 'right';

function getScreenMode(): ScreenMode {
  const mode = new URLSearchParams(window.location.search).get('screen');

  if (mode === 'left' || mode === 'right') {
    return mode;
  }

  return 'wide';
}

export default function App() {
  const now = useCurrentTime();
  const activeView = useRotatingForecast();
  const weather = useWeatherSnapshot();
  const screenMode = getScreenMode();

  return (
    <main className={`signage-shell screen-${screenMode}`}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      {screenMode !== 'right' && <CurrentPanel now={now} weather={weather} />}
      {screenMode !== 'left' && <ForecastRotator activeView={activeView} weather={weather} />}
      {screenMode === 'wide' && <div className="bezel-guide" aria-hidden="true" />}
    </main>
  );
}
