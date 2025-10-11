import AchievementSystem from '../components/AchievementSystem';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import CodeEditor from '../components/CodeEditor';
import ProgressDashboard from '../components/ProgressDashboard';
import { useTheme } from '../contexts/ThemeContext';
import SettingsPanel from '../components/SettingsPanel';
import { useState, useEffect } from 'react';
import PuzzlePage from './PuzzlePage';

function ExercisePage() {
  const { t } = useTranslation();
  const { currentTheme } = useTheme();
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const [showInstructions, setShowInstructions] = useState(false);

  const handleInstall = async () => {
    // If browser supports auto-install
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setShowInstall(false);
      }
      
      setDeferredPrompt(null);
    } else {
      // Show manual install instructions
      setShowInstructions(true);
    }
  };

  if (showPuzzle) {
    return <PuzzlePage onBack={() => setShowPuzzle(false)} />;
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

        {/* Puzzle Button */}
        <div className="mb-6 text-center">
          <button
            onClick={() => setShowPuzzle(true)}
            className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-black text-2xl shadow-2xl hover:shadow-yellow-500/50 transition-all transform hover:scale-110 animate-pulse"
          >
            ✨ Open Disney Puzzle Magic
          </button>
          <p className="text-white font-medium mt-2">
            Build Disney character puzzles by earning coins through coding!
          </p>
        </div>

        {/* Install Button */}
        {true && (
          <div className="mb-6 text-center">
            <button
              onClick={handleInstall}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-xl shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-110"
            >
              📱 Install App (Works Offline!)
            </button>
            <p className="text-white font-medium mt-2">
              Click to see how to install on your device!
            </p>
          </div>
        )}

        {/* Install Instructions Modal */}
        {showInstructions && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowInstructions(false)}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  📱 How to Install CodeQuest
                </h2>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* iPhone Instructions */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-4xl">📱</div>
                    <h3 className="text-xl font-bold text-gray-800">iPhone (Safari)</h3>
                  </div>
                  <ol className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">1.</span>
                      <span>Tap the <strong>Share button</strong> (square with arrow ⬆️) at bottom</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">2.</span>
                      <span>Scroll down and tap <strong>"Add to Home Screen"</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">3.</span>
                      <span>Tap <strong>"Add"</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">4.</span>
                      <span>Find CodeQuest icon on your home screen! 🎉</span>
                    </li>
                  </ol>
                </div>

                {/* Android Instructions */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-4xl">🤖</div>
                    <h3 className="text-xl font-bold text-gray-800">Android (Chrome)</h3>
                  </div>
                  <ol className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-green-600">1.</span>
                      <span>Tap <strong>3 dots menu</strong> (⋮) in top right</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-green-600">2.</span>
                      <span>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-green-600">3.</span>
                      <span>Tap <strong>"Install"</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-green-600">4.</span>
                      <span>CodeQuest app installed! 🎉</span>
                    </li>
                  </ol>
                </div>

                {/* Desktop Instructions */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-4xl">💻</div>
                    <h3 className="text-xl font-bold text-gray-800">Desktop (Chrome)</h3>
                  </div>
                  <ol className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-purple-600">1.</span>
                      <span>Look for <strong>⊕ icon</strong> in the address bar (top right)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-purple-600">2.</span>
                      <span>Click it and select <strong>"Install"</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-purple-600">3.</span>
                      <span>CodeQuest opens in its own window! 🎉</span>
                    </li>
                  </ol>
                </div>

                {/* Benefits */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-300">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">✨ Why Install?</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500 text-xl">✓</span>
                      <span><strong>Works offline</strong> - Code without internet!</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500 text-xl">✓</span>
                      <span><strong>Faster loading</strong> - Cached on your device</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500 text-xl">✓</span>
                      <span><strong>App-like experience</strong> - No browser bars!</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500 text-xl">✓</span>
                      <span><strong>Home screen icon</strong> - Easy access anytime</span>
                    </li>
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setShowInstructions(false)}
                className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
              >
                Got it! 👍
              </button>
            </div>
          </div>
        )}

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