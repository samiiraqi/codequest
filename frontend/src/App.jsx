import { useTranslation } from 'react-i18next';
import './i18n/config';
import ExercisePage from './pages/ExercisePage';
import { ProgressProvider } from './contexts/ProgressContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { PuzzleProvider } from './contexts/PuzzleContext';
import OfflineIndicator from './components/OfflineIndicator';
import { useEffect } from 'react';
import { loadPyodideIfNeeded } from './utils/offlineCodeRunner';

function App() {
  const { t } = useTranslation();

  // Preload Python offline support
  useEffect(() => {
    if (!navigator.onLine) {
      // If offline, load Python immediately
      loadPyodideIfNeeded().catch(err => {
        console.log('Could not preload Python:', err);
      });
    }
  }, []);

  return (
    <ThemeProvider>
      <ProgressProvider>
        <PuzzleProvider>
          <OfflineIndicator />
          <ExercisePage />
        </PuzzleProvider>
      </ProgressProvider>
    </ThemeProvider>
  );
}

export default App;