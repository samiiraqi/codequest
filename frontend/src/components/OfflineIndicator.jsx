import { useState, useEffect } from 'react';

function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-orange-500 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-white rounded-full"></div>
        <span className="font-bold">📡 Offline Mode - Code runs in browser!</span>
      </div>
    </div>
  );
}

export default OfflineIndicator;