import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { useProgress } from '../contexts/ProgressContext';
import { useTheme } from '../contexts/ThemeContext';
import SavedCodeManager from './SavedCodeManager';
import ExerciseBrowser from './ExerciseBrowser';
import ShareModal from './ShareModal';
import ChallengeMode from './ChallengeMode';
import ExecutionStats from './ExecutionStats';
import { playSound, initAudio } from '../utils/sounds';
import CodeExplainer from './CodeExplainer';
function CodeEditor() {
  const { t } = useTranslation();
  const { trackCodeRun } = useProgress();
  const { fontSize, soundEnabled } = useTheme();
  
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('# Write your code here\nprint("Hello, CodeQuest!")');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  
  const defaultCode = {
    python: '# Write your code here\nprint("Hello, CodeQuest!")',
    javascript: '// Write your code here\nconsole.log("Hello, CodeQuest!");',
    html: '<!-- Write HTML here -->\n<h1>Hello, CodeQuest!</h1>\n<p>This is HTML preview</p>'
  };

  // Check for shared code in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shared = params.get('shared');
    
    if (shared) {
      try {
        const decoded = JSON.parse(decodeURIComponent(escape(atob(shared))));
        if (decoded.code && decoded.language) {
          setLanguage(decoded.language);
          setCode(decoded.code);
          setTimeout(() => {
            alert('📥 Shared code loaded! Click Run to see it in action! 🚀');
          }, 500);
        }
      } catch (err) {
        console.error('Failed to load shared code:', err);
      }
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveCode();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [code, language]);
  // Initialize audio on component mount (for mobile)
  useEffect(() => {
    // Initialize audio context on any user interaction
    const initAudioContext = () => {
      initAudio();
      // Remove listeners after first interaction
      document.removeEventListener('touchstart', initAudioContext);
      document.removeEventListener('click', initAudioContext);
    };
    
    document.addEventListener('touchstart', initAudioContext, { once: true });
    document.addEventListener('click', initAudioContext, { once: true });
    
    return () => {
      document.removeEventListener('touchstart', initAudioContext);
      document.removeEventListener('click', initAudioContext);
    };
  }, []);

  const celebrate = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#9333EA', '#EC4899', '#F59E0B', '#3B82F6', '#10B981']
      });
      
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#9333EA', '#EC4899', '#F59E0B', '#3B82F6', '#10B981']
      });
    }, 50);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('');
    setError('');
    setExecutionTime(0);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const endpoint = apiUrl ? `${apiUrl}/api/execute` : '/api/execute';
      
      const response = await axios.post(endpoint, {
        code: code,
        language: language
      });

      const result = response.data;
      
      if (result.status === 'success') {
        setOutput(result.output);
        setExecutionTime(result.execution_time);
        trackCodeRun(language, true);
        
        // Play success sound if enabled
        if (soundEnabled) {
          try {
            playSound('success');
          } catch (err) {
            console.log('Sound error:', err);
          }
        }
        
        celebrate();
      } else {
        setError(result.error);
        setExecutionTime(result.execution_time);
        
        // Play error sound if enabled
        if (soundEnabled) {
          try {
            playSound('error');
          } catch (err) {
            console.log('Sound error:', err);
          }
        }
      }
    } catch (err) {
      setError('Failed to execute code. Make sure the backend is running!');
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setCode(defaultCode[newLang]);
    setOutput('');
    setError('');
  };

  const handleSaveCode = () => {
    const saveName = prompt('Name your code:');
    if (!saveName) return;

    const saved = JSON.parse(localStorage.getItem(`codequest_saved_${language}`) || '[]');
    saved.push({
      id: Date.now(),
      name: saveName,
      code: code,
      language: language,
      date: new Date().toISOString(),
    });
    localStorage.setItem(`codequest_saved_${language}`, JSON.stringify(saved));
    
    // Play save sound if enabled
    if (soundEnabled) {
      try {
        playSound('save');
      } catch (err) {
        console.log('Sound error:', err);
      }
    }
    
    alert('Code saved! ✅');
  };

  const handleLoadCode = (loadedCode) => {
    setCode(loadedCode);
  };

  const handleSelectExercise = (exercise) => {
    setCode(exercise.code);
    setOutput('');
    setError('');
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    alert('✅ Output copied to clipboard!');
  };

  const clearOutput = () => {
    setOutput('');
    setError('');
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex items-start gap-4 animate-fadeIn">
        <div className="text-6xl md:text-7xl animate-bounce">🤖</div>
        <div className="flex-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 shadow-xl border-2 border-white/50 backdrop-blur-sm">
          <p className="text-lg md:text-xl font-bold text-gray-800">
            {t('codebot.greeting')}
          </p>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            ✨ Try running the code below, or write your own masterpiece!
          </p>
        </div>
      </div>
      
      <ChallengeMode language={language} onLoadCode={handleLoadCode} />
      <ExerciseBrowser language={language} onSelectExercise={handleSelectExercise} />
      <SavedCodeManager language={language} onLoadCode={handleLoadCode} />

      <div className="mb-6 flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => handleLanguageChange('python')}
          className={`px-6 py-3 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg ${
            language === 'python'
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/50'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          🐍 Python
        </button>
        <button
          onClick={() => handleLanguageChange('javascript')}
          className={`px-6 py-3 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg ${
            language === 'javascript'
              ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-yellow-500/50'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          🟨 JavaScript
        </button>
        <button
          onClick={() => handleLanguageChange('html')}
          className={`px-6 py-3 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg ${
            language === 'html'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-500/50'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          🎨 HTML
        </button>
      </div>
               <CodeExplainer language={language} code={code} />
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-6 border-4 border-white/50" dir="ltr">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4 flex items-center justify-between">
          <span className="font-mono text-base md:text-lg font-bold">
            {language === 'python' && '🐍 Python Editor'}
            {language === 'javascript' && '🟨 JavaScript Editor'}
            {language === 'html' && '🎨 HTML Editor'}
          </span>
          <span className="text-xs md:text-sm text-gray-400 hidden md:block">
            Press Ctrl+Enter to run
          </span>
        </div>
        
        <div dir="ltr">
          <Editor
            height="350px"
            language={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: fontSize,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: 'on',
            }}
            onMount={(editor) => {
              editor.addCommand(window.monaco.KeyMod.CtrlCmd | window.monaco.KeyCode.Enter, handleRunCode);
            }}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
                    onClick={() => {
            initAudio(); // Initialize audio on button click
            handleRunCode();
          }}

          disabled={isRunning}
          className={`flex-1 py-4 px-8 rounded-xl font-bold text-xl shadow-2xl transition-all transform hover:scale-105 ${
            isRunning
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white hover:shadow-green-500/50 animate-pulse'
          }`}
        >
          {isRunning ? (
            <span className="flex items-center justify-center gap-3">
              <div className="animate-spin h-6 w-6 border-3 border-white border-t-transparent rounded-full"></div>
              Running Magic... ✨
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              🚀 Run Code
            </span>
          )}
        </button>
        
        <button
          onClick={handleSaveCode}
          className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
        >
          💾 Save
        </button>

        <button
          onClick={() => setShowShareModal(true)}
          className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
        >
          🔗 Share
        </button>
        
        <button
          onClick={() => setCode(defaultCode[language])}
          className="px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
        >
          🔄 Reset
        </button>
      </div>

      {showShareModal && (
        <ShareModal
          code={code}
          language={language}
          onClose={() => setShowShareModal(false)}
        />
      )}

      <div className="mb-6">
        <ExecutionStats 
          executionTime={executionTime}
          language={language}
          linesOfCode={code.split('\n').length}
        />
      </div>
      {(output || error) && (
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6 border-4 border-white/50 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-2xl">
              {error ? '❌ Oops!' : '✅ Success!'}
            </h3>
            {executionTime > 0 && (
              <span className="text-sm font-bold text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                ⚡ {executionTime}s
              </span>
            )}
          </div>
          
          {error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl" dir="ltr">
              <pre className="text-red-700 font-mono text-sm whitespace-pre-wrap">
                {error}
              </pre>
            </div>
          ) : (
            <>
              {language === 'html' ? (
                <>
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 p-6 rounded-xl">
                    <h4 className="font-bold text-gray-800 mb-3 text-lg">🎨 Preview:</h4>
                    <iframe
                      srcDoc={output}
                      className="w-full bg-white border-2 border-gray-300 rounded-xl shadow-inner"
                      style={{ minHeight: '200px', height: '400px' }}
                      title="HTML Preview"
                      sandbox="allow-scripts"
                    />
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-xl" dir="ltr">
                    <h4 className="font-bold text-gray-800 mb-3 text-lg">📝 HTML Code:</h4>
                    <pre className="text-gray-800 font-mono text-sm whitespace-pre-wrap bg-white p-4 rounded-lg">
                      {output}
                    </pre>
                  </div>
                </>
              ) : (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-xl" dir="ltr">
                  <pre className="text-gray-800 font-mono text-sm md:text-base whitespace-pre-wrap">
                    {output || '(no output)'}
                  </pre>
                </div>
              )}
            </>
          )}

          {output && !error && (
            <div className="mt-6 flex items-center gap-3 text-green-600 font-bold text-lg bg-green-50 p-4 rounded-xl animate-bounce">
              <span className="text-3xl">🎉</span>
              <span>
                {language === 'html' ? 'Your HTML looks amazing!' : 'Awesome! Your code ran perfectly!'}
              </span>
              <span className="text-3xl">✨</span>
            </div>
          )}

          <div className="mt-4 flex gap-3">
            {output && !error && (
              <button
                onClick={copyOutput}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all"
              >
                📋 Copy Output
              </button>
            )}
            <button
              onClick={clearOutput}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
            >
              🗑️ Clear Output
            </button>
          </div>
        </div>
      )}

      {showShortcuts && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                ⌨️ Keyboard Shortcuts
              </h3>
              <button
                onClick={() => setShowShortcuts(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Run Code</span>
                <kbd className="px-3 py-1 bg-gray-800 text-white rounded font-mono text-sm">
                  Ctrl + Enter
                </kbd>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Save Code</span>
                <kbd className="px-3 py-1 bg-gray-800 text-white rounded font-mono text-sm">
                  Ctrl + S
                </kbd>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Show Shortcuts</span>
                <kbd className="px-3 py-1 bg-gray-800 text-white rounded font-mono text-sm">
                  Ctrl + /
                </kbd>
              </div>
            </div>

            <button
              onClick={() => setShowShortcuts(false)}
              className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Got it! ✅
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowShortcuts(true)}
        className="fixed bottom-6 left-6 bg-gradient-to-r from-gray-700 to-gray-900 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-gray-700/50 transition-all transform hover:scale-110 z-40"
        title="Keyboard Shortcuts"
      >
        ⌨️
      </button>

      <div className="mt-8 bg-white rounded-2xl shadow-2xl p-6 border-4 border-white/50">
        <h3 className="font-black text-2xl mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          📚 Try These Examples
        </h3>
        
        {language === 'python' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setCode('# Hello World\nprint("Hello, CodeQuest!")')}
              className="text-left p-5 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all transform hover:scale-105 shadow-md border-2 border-blue-200"
            >
              <div className="font-bold text-blue-700 text-lg mb-1">👋 Hello World</div>
              <div className="text-sm text-gray-600">Print your first message</div>
            </button>
            
            <button
              onClick={() => setCode('# Math Operations\nx = 5\ny = 3\nprint(f"{x} + {y} = {x + y}")\nprint(f"{x} * {y} = {x * y}")')}
              className="text-left p-5 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all transform hover:scale-105 shadow-md border-2 border-green-200"
            >
              <div className="font-bold text-green-700 text-lg mb-1">➕ Math Operations</div>
              <div className="text-sm text-gray-600">Add and multiply numbers</div>
            </button>
            
            <button
              onClick={() => setCode('# Loop Example\nfor i in range(1, 6):\n    print(f"Count: {i}")')}
              className="text-left p-5 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all transform hover:scale-105 shadow-md border-2 border-purple-200"
            >
              <div className="font-bold text-purple-700 text-lg mb-1">🔁 Loop</div>
              <div className="text-sm text-gray-600">Count from 1 to 5</div>
            </button>
            
            <button
              onClick={() => setCode('# Draw Pattern\nfor i in range(5):\n    print("⭐" * (i + 1))')}
              className="text-left p-5 bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 rounded-xl transition-all transform hover:scale-105 shadow-md border-2 border-pink-200"
            >
              <div className="font-bold text-pink-700 text-lg mb-1">🎨 Pattern</div>
              <div className="text-sm text-gray-600">Draw a star pattern</div>
            </button>
          </div>
        )}
        
        {language === 'javascript' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setCode('// Hello World\nconsole.log("Hello, CodeQuest!");')}
              className="text-left p-5 bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 rounded-xl transition-all transform hover:scale-105 shadow-md border-2 border-yellow-200"
            >
              <div className="font-bold text-yellow-700 text-lg mb-1">👋 Hello World</div>
              <div className="text-sm text-gray-600">Print your first message</div>
            </button>
            
            <button
              onClick={() => setCode('// Math Operations\nconst x = 5;\nconst y = 3;\nconsole.log(x + y);')}
              className="text-left p-5 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all transform hover:scale-105 shadow-md border-2 border-green-200"
            >
              <div className="font-bold text-green-700 text-lg mb-1">➕ Math Operations</div>
              <div className="text-sm text-gray-600">Add and multiply numbers</div>
            </button>
            
            <button
              onClick={() => setCode('// Loop Example\nfor (let i = 1; i <= 5; i++) {\n  console.log("Count: " + i);\n}')}
              className="text-left p-5 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all transform hover:scale-105 shadow-md border-2 border-purple-200"
            >
              <div className="font-bold text-purple-700 text-lg mb-1">🔁 Loop</div>
              <div className="text-sm text-gray-600">Count from 1 to 5</div>
            </button>
            
            <button
              onClick={() => setCode('// Array Example\nconst fruits = ["🍎", "🍌", "🍊"];\nfruits.forEach(f => console.log(f));')}
              className="text-left p-5 bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 rounded-xl transition-all transform hover:scale-105 shadow-md border-2 border-pink-200"
            >
              <div className="font-bold text-pink-700 text-lg mb-1">📋 Arrays</div>
              <div className="text-sm text-gray-600">Work with arrays</div>
            </button>
          </div>
        )}
        
        {language === 'html' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setCode('<h1>Hello World</h1>\n<p>Welcome to CodeQuest!</p>')}
              className="text-left p-5 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl transition-all transform hover:scale-105 shadow-md border-2 border-orange-200"
            >
              <div className="font-bold text-orange-700 text-lg mb-1">👋 Hello World</div>
              <div className="text-sm text-gray-600">Basic HTML structure</div>
            </button>
            
            <button
              onClick={() => setCode('<h1 style="color: blue;">Styled Header</h1>\n<p style="background: yellow; padding: 10px;">Styled paragraph</p>')}
              className="text-left p-5 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all transform hover:scale-105 shadow-md border-2 border-green-200"
            >
              <div className="font-bold text-green-700 text-lg mb-1">🎨 Inline Styles</div>
              <div className="text-sm text-gray-600">Add colors and styles</div>
            </button>
            
            <button
              onClick={() => setCode('<ul>\n  <li>Apple 🍎</li>\n  <li>Banana 🍌</li>\n  <li>Orange 🍊</li>\n</ul>')}
              className="text-left p-5 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all transform hover:scale-105 shadow-md border-2 border-purple-200"
            >
              <div className="font-bold text-purple-700 text-lg mb-1">📋 Lists</div>
              <div className="text-sm text-gray-600">Create a list</div>
            </button>
            
            <button
              onClick={() => setCode('<div style="border: 2px solid blue; padding: 20px; border-radius: 10px;">\n  <h2>Card Title</h2>\n  <p>Card content</p>\n</div>')}
              className="text-left p-5 bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 rounded-xl transition-all transform hover:scale-105 shadow-md border-2 border-pink-200"
            >
              <div className="font-bold text-pink-700 text-lg mb-1">📦 Card</div>
              <div className="text-sm text-gray-600">Create a styled card</div>
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default CodeEditor;