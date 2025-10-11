import { useState, useEffect } from 'react';

function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pythonLoading, setPythonLoading] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => {
      setIsOnline(false);
      setPythonLoading(true);
      
      // Preload Python
      import('../utils/offlineCodeRunner').then(({ loadPyodideIfNeeded }) => {
        loadPyodideIfNeeded()
          .then(() => {
            setPythonLoading(false);
          })
          .catch(() => {
            setPythonLoading(false);
          });
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check on mount
    if (!navigator.onLine) {
      handleOffline();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-orange-500 text-white px-6 py-3 rounded-xl shadow-2xl z-50">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        <div>
          <div className="font-bold">📡 Offline Mode</div>
          {pythonLoading ? (
            <div className="text-xs">Loading Python... (10-20 sec)</div>
          ) : (
            <div className="text-xs">Python & JavaScript run in browser!</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OfflineIndicator;