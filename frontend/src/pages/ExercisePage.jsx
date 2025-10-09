import AchievementSystem from '../components/AchievementSystem';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import CodeEditor from '../components/CodeEditor';
import ProgressDashboard from '../components/ProgressDashboard';
import { useTheme } from '../contexts/ThemeContext';
import SettingsPanel from '../components/SettingsPanel';
import { useState } from 'react';
import { useKingdom } from '../contexts/KingdomContext';
import KingdomPage from './KingdomPage';

function ExercisePage() {
  const { t } = useTranslation();
  const { currentTheme } = useTheme();
  const [showKingdom, setShowKingdom] = useState(false);

  if (showKingdom) {
    return <KingdomPage onBack={() => setShowKingdom(false)} />;
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-6xl">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 mb-8 border-4 border-white/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 animate-gradient">
                {t('app.title')}
              </h1>
              <p className="text-gray-600 mt-2 text-lg font-medium">
                🚀 Interactive Coding Playground for Young Developers
              </p>
            </div>
            <LanguageSelector />
          </div>
        </header>
         {/* Progress Dashboard */}
          <ProgressDashboard />
          {/* Achievement System */}
          <AchievementSystem />

          {/* Main Code Editor - CENTERED */}
          {/* Kingdom Button - ADD THIS */}
          <div className="mb-6 text-center">
            <button
              onClick={() => setShowKingdom(true)}
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-black text-2xl shadow-2xl hover:shadow-yellow-500/50 transition-all transform hover:scale-110 animate-pulse"
            >
              🏰 Open Code Kingdom Builder
            </button>
            <p className="text-white font-medium mt-2">
              Build your kingdom by earning coins through coding!
            </p>
          </div>

        {/* Main Content - Centered */}
        <main className="flex justify-center">
          <div className="w-full max-w-5xl">
            <CodeEditor />
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center mt-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-white/50">
            <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Built with ❤️ for Young Coders
            </p>
            <p className="text-gray-600 mt-2">
              Powered by React • FastAPI • Love for Education 🎓
            </p>
          </div>
        </footer>
      </div>

      {/* Settings Panel */}
      <SettingsPanel />

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default ExercisePage;