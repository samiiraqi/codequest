import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import CodeEditor from '../components/CodeEditor';

function ExercisePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                {t('app.title')}
              </h1>
              <p className="text-gray-600 mt-2">Interactive Coding Playground</p>
            </div>
            <LanguageSelector />
          </div>
        </header>

        {/* Main Content */}
        <main className="bg-white rounded-2xl shadow-2xl p-8">
          <CodeEditor />
        </main>

        {/* Footer */}
        <footer className="text-center mt-8 text-white">
          <p className="text-lg font-medium">Built with ❤️ for young coders</p>
        </footer>
      </div>
    </div>
  );
}

export default ExercisePage;