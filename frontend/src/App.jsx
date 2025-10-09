import { useTranslation } from 'react-i18next';
import './i18n/config';
import ExercisePage from './pages/ExercisePage';
import { ProgressProvider } from './contexts/ProgressContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { KingdomProvider } from './contexts/KingdomContext';

function App() {
  const { t } = useTranslation();

  return (
    <ThemeProvider>
      <ProgressProvider>
        <KingdomProvider>
          <ExercisePage />
        </KingdomProvider>
      </ProgressProvider>
    </ThemeProvider>
  );
}

export default App;