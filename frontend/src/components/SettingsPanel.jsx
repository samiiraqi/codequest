import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

function SettingsPanel() {
  const [showSettings, setShowSettings] = useState(false);
  const { 
    theme, 
    setTheme, 
    themes, 
    fontSize, 
    increaseFontSize, 
    decreaseFontSize,
    soundEnabled,
    toggleSound
  } = useTheme();

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-110 z-40"
        title="Settings"
      >
        <span className="text-2xl">⚙️</span>
      </button>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                ⚙️ Settings
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Theme Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">🎨 Choose Theme</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(themes).map(([key, t]) => (
                  <button
                    key={key}
                    onClick={() => setTheme(key)}
                    className={`p-4 rounded-xl transition-all transform hover:scale-105 ${
                      theme === key
                        ? 'ring-4 ring-purple-500 shadow-xl'
                        : 'shadow-md hover:shadow-lg'
                    }`}
                  >
                    <div className={`h-20 rounded-lg bg-gradient-to-br ${t.gradient} mb-2`}></div>
                    <p className="font-bold text-gray-800">{t.name}</p>
                    {theme === key && (
                      <p className="text-xs text-purple-600 font-medium mt-1">✓ Active</p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">📏 Font Size</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={decreaseFontSize}
                  disabled={fontSize <= 10}
                  className={`px-6 py-3 rounded-xl font-bold text-2xl transition-all ${
                    fontSize <= 10
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-lg'
                  }`}
                >
                  A-
                </button>
                <div className="flex-1 text-center">
                  <div className="text-4xl font-black text-gray-800">{fontSize}px</div>
                  <div className="text-sm text-gray-600 mt-1">Editor font size</div>
                </div>
                <button
                  onClick={increaseFontSize}
                  disabled={fontSize >= 20}
                  className={`px-6 py-3 rounded-xl font-bold text-2xl transition-all ${
                    fontSize >= 20
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg'
                  }`}
                >
                  A+
                </button>
              </div>
            </div>

            {/* Sound Effects */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">🔊 Sound Effects</h3>
              <button
                onClick={toggleSound}
                className={`w-full p-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg ${
                  soundEnabled
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl">{soundEnabled ? '🔊' : '🔇'}</span>
                  <span>{soundEnabled ? 'Sound ON' : 'Sound OFF'}</span>
                </div>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowSettings(false)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
            >
              ✅ Save & Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SettingsPanel;