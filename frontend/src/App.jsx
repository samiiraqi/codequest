import { useTranslation } from 'react-i18next';
import './i18n/config';
import ExercisePage from './pages/ExercisePage';

function App() {
  const { t } = useTranslation();

  return <ExercisePage />;
}

export default App;