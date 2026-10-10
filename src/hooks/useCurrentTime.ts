import { useEffect, useState } from 'react';

export function useCurrentTime(): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const syncClock = () => {
      setNow(new Date());
    };

    syncClock();
    const intervalId = window.setInterval(syncClock, 1_000);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        syncClock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return now;
}
