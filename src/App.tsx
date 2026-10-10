import { CurrentPanel } from './components/CurrentPanel';
import { ForecastRotator } from './components/ForecastRotator';
import { useCurrentTime } from './hooks/useCurrentTime';
import { useRotatingForecast } from './hooks/useRotatingForecast';
import { useWeatherSnapshot } from './hooks/useWeatherSnapshot';

export default function App() {
  const now = useCurrentTime();
  const activeView = useRotatingForecast();
  const weather = useWeatherSnapshot();

  return (
    <main className="signage-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <CurrentPanel now={now} weather={weather} />
      <ForecastRotator activeView={activeView} weather={weather} />
      <div className="bezel-guide" aria-hidden="true" />
    </main>
  );
}
