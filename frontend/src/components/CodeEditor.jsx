import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Editor from '@monaco-editor/react';
import axios from 'axios';

function CodeEditor() {
  const { t } = useTranslation();
  
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('# Write your code here\nprint("Hello, CodeQuest!")');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);
  
  const defaultCode = {
    python: '# Write your code here\nprint("Hello, CodeQuest!")',
    javascript: '// Write your code here\nconsole.log("Hello, CodeQuest!");',
    html: '<!-- Write HTML here -->\n<h1>Hello, CodeQuest!</h1>\n<p>This is HTML preview</p>'
  };

  const handleRunCode = async () => {
  setIsRunning(true);
  setOutput('');
  setError('');
  setExecutionTime(0);

  try {
    // Use environment variable for API URL
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
      } else {
        setError(result.error);
        setExecutionTime(result.execution_time);
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

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6 flex items-start gap-4">
        <div className="text-6xl">🤖</div>
        <div className="flex-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 shadow-lg">
          <p className="text-lg font-medium text-gray-800">
            {t('codebot.greeting')}
          </p>
          <p className="text-gray-600 mt-2">
            Try running the code below, or write your own!
          </p>
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => handleLanguageChange('python')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            language === 'python'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
          }`}
        >
          🐍 Python
        </button>
        <button
          onClick={() => handleLanguageChange('javascript')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            language === 'javascript'
              ? 'bg-yellow-500 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
          }`}
        >
          🟨 JavaScript
        </button>
        <button
          onClick={() => handleLanguageChange('html')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            language === 'html'
              ? 'bg-orange-500 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
          }`}
        >
          🎨 HTML
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-4" dir="ltr">
        <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
          <span className="font-mono text-sm">
            {language === 'python' && '🐍 Python Editor'}
            {language === 'javascript' && '🟨 JavaScript Editor'}
            {language === 'html' && '🎨 HTML Editor'}
          </span>
          <span className="text-xs text-gray-400">Press Ctrl+Enter to run</span>
        </div>
        
        <div dir="ltr">
          <Editor
            height="300px"
            language={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
            onMount={(editor) => {
              editor.addCommand(window.monaco.KeyMod.CtrlCmd | window.monaco.KeyCode.Enter, handleRunCode);
            }}
          />
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <button
          onClick={handleRunCode}
          disabled={isRunning}
          className={`flex-1 py-3 px-6 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 ${
            isRunning
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-xl'
          }`}
        >
          {isRunning ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              Running...
            </span>
          ) : (
            <span>🚀 Run Code</span>
          )}
        </button>
        
        <button
          onClick={() => setCode(defaultCode[language])}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl font-medium transition-all"
        >
          🔄 Reset
        </button>
      </div>

      {(output || error) && (
        <div className="bg-white rounded-xl shadow-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg">
              {error ? '❌ Error' : '✅ Output'}
            </h3>
            {executionTime > 0 && (
              <span className="text-sm text-gray-500">
                ⚡ {executionTime}s
              </span>
            )}
          </div>
          
          {error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded" dir="ltr">
              <pre className="text-red-700 font-mono text-sm whitespace-pre-wrap">
                {error}
              </pre>
            </div>
          ) : (
            <>
              {language === 'html' ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 border-l-4 border-orange-500 p-4 rounded">
                    <h4 className="font-semibold text-gray-700 mb-2">Preview:</h4>
                    <div 
                      className="bg-white border border-gray-300 rounded p-4 min-h-[100px]"
                      dangerouslySetInnerHTML={{ __html: output }}
                    />
                  </div>
                  <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded" dir="ltr">
                    <h4 className="font-semibold text-gray-700 mb-2">HTML Code:</h4>
                    <pre className="text-gray-800 font-mono text-sm whitespace-pre-wrap">
                      {output}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border-l-4 border-green-500 p-4 rounded" dir="ltr">
                  <pre className="text-gray-800 font-mono text-sm whitespace-pre-wrap">
                    {output || '(no output)'}
                  </pre>
                </div>
              )}
            </>
          )}

          {output && !error && (
            <div className="mt-4 flex items-center gap-2 text-green-600 font-medium">
              <span className="text-2xl">🎉</span>
              <span>
                {language === 'html' ? 'Your HTML is displayed above!' : 'Great job! Your code ran successfully!'}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h3 className="font-bold text-xl mb-4">📚 Try These Examples:</h3>
        
        {language === 'python' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={() => setCode('# Hello World\nprint("Hello, CodeQuest!")')}
              className="text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <div className="font-semibold text-blue-700">👋 Hello World</div>
              <div className="text-sm text-gray-600">Print your first message</div>
            </button>
            
            <button
              onClick={() => setCode('# Math Operations\nx = 5\ny = 3\nprint(f"{x} + {y} = {x + y}")\nprint(f"{x} * {y} = {x * y}")')}
              className="text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <div className="font-semibold text-green-700">➕ Math Operations</div>
              <div className="text-sm text-gray-600">Add and multiply numbers</div>
            </button>
            
            <button
              onClick={() => setCode('# Loop Example\nfor i in range(1, 6):\n    print(f"Count: {i}")')}
              className="text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <div className="font-semibold text-purple-700">🔁 Loop</div>
              <div className="text-sm text-gray-600">Count from 1 to 5</div>
            </button>
            
            <button
              onClick={() => setCode('# Draw Pattern\nfor i in range(5):\n    print("⭐" * (i + 1))')}
              className="text-left p-3 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors"
            >
              <div className="font-semibold text-pink-700">🎨 Pattern</div>
              <div className="text-sm text-gray-600">Draw a star pattern</div>
            </button>
          </div>
        )}
        
        {language === 'javascript' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={() => setCode('// Hello World\nconsole.log("Hello, CodeQuest!");')}
              className="text-left p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
            >
              <div className="font-semibold text-yellow-700">👋 Hello World</div>
              <div className="text-sm text-gray-600">Print your first message</div>
            </button>
            
            <button
              onClick={() => setCode('// Math Operations\nconst x = 5;\nconst y = 3;\nconsole.log(x + y);')}
              className="text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <div className="font-semibold text-green-700">➕ Math Operations</div>
              <div className="text-sm text-gray-600">Add and multiply numbers</div>
            </button>
            
            <button
              onClick={() => setCode('// Loop Example\nfor (let i = 1; i <= 5; i++) {\n  console.log("Count: " + i);\n}')}
              className="text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <div className="font-semibold text-purple-700">🔁 Loop</div>
              <div className="text-sm text-gray-600">Count from 1 to 5</div>
            </button>
            
            <button
              onClick={() => setCode('// Array Example\nconst fruits = ["🍎", "🍌", "🍊"];\nfruits.forEach(f => console.log(f));')}
              className="text-left p-3 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors"
            >
              <div className="font-semibold text-pink-700">📋 Arrays</div>
              <div className="text-sm text-gray-600">Work with arrays</div>
            </button>
          </div>
        )}
        
        {language === 'html' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={() => setCode('<h1>Hello World</h1>\n<p>Welcome to CodeQuest!</p>')}
              className="text-left p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
            >
              <div className="font-semibold text-orange-700">👋 Hello World</div>
              <div className="text-sm text-gray-600">Basic HTML structure</div>
            </button>
            
            <button
              onClick={() => setCode('<h1 style="color: blue;">Styled Header</h1>\n<p style="background: yellow; padding: 10px;">Styled paragraph</p>')}
              className="text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <div className="font-semibold text-green-700">🎨 Inline Styles</div>
              <div className="text-sm text-gray-600">Add colors and styles</div>
            </button>
            
            <button
              onClick={() => setCode('<ul>\n  <li>Apple 🍎</li>\n  <li>Banana 🍌</li>\n  <li>Orange 🍊</li>\n</ul>')}
              className="text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <div className="font-semibold text-purple-700">📋 Lists</div>
              <div className="text-sm text-gray-600">Create a list</div>
            </button>
            
            <button
              onClick={() => setCode('<div style="border: 2px solid blue; padding: 20px; border-radius: 10px;">\n  <h2>Card Title</h2>\n  <p>Card content</p>\n</div>')}
              className="text-left p-3 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors"
            >
              <div className="font-semibold text-pink-700">📦 Card</div>
              <div className="text-sm text-gray-600">Create a styled card</div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeEditor;