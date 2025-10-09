import { useTranslation } from 'react-i18next';
import './i18n/config';
import ExercisePage from './pages/ExercisePage';
import { ProgressProvider } from './contexts/ProgressContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { PuzzleProvider } from './contexts/PuzzleContext';

function App() {
  const { t } = useTranslation();

  return (
    <ThemeProvider>
      <ProgressProvider>
        <PuzzleProvider>
          <ExercisePage />
        </PuzzleProvider>
      </ProgressProvider>
    </ThemeProvider>
  );
}

export default App;