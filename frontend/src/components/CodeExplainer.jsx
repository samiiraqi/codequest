import { useState } from 'react';

function CodeExplainer({ language, code }) {
  const [showExplanation, setShowExplanation] = useState(false);

  // Function to explain code based on language
  const explainCode = () => {
    if (!code || code.trim() === '') {
      return [{
        line: 0,
        text: "Write some code first, then click 'Explain This Code' to learn what it does!"
      }];
    }

    const lines = code.split('\n');
    const explanations = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine === '' || trimmedLine.startsWith('//') || trimmedLine.startsWith('#')) {
        return; // Skip empty lines and comments
      }

      let explanation = '';

      // Python explanations
      if (language === 'python') {
        if (trimmedLine.includes('print(')) {
          const content = trimmedLine.match(/print\((.*?)\)/)?.[1] || '';
          explanation = `📢 <strong>print()</strong> - Displays text on the screen. It shows: ${content}`;
        }
        else if (trimmedLine.includes('input(')) {
          explanation = `⌨️ <strong>input()</strong> - Asks the user to type something and waits for their answer`;
        }
        else if (trimmedLine.includes('=') && !trimmedLine.includes('==')) {
          const varName = trimmedLine.split('=')[0].trim();
          explanation = `📦 <strong>Variable</strong> - Creates a box called "${varName}" to store information`;
        }
        else if (trimmedLine.startsWith('for ')) {
          explanation = `🔁 <strong>for loop</strong> - Repeats the code inside multiple times`;
        }
        else if (trimmedLine.startsWith('if ')) {
          explanation = `❓ <strong>if statement</strong> - Checks if something is true, then decides what to do`;
        }
        else if (trimmedLine.startsWith('else:')) {
          explanation = `↔️ <strong>else</strong> - If the "if" was false, do this instead`;
        }
        else if (trimmedLine.startsWith('def ')) {
          const funcName = trimmedLine.match(/def\s+(\w+)/)?.[1] || '';
          explanation = `⚙️ <strong>function</strong> - Creates reusable code called "${funcName}" that you can run later`;
        }
        else if (trimmedLine.includes('range(')) {
          const num = trimmedLine.match(/range\((\d+)\)/)?.[1] || '';
          explanation = `🔢 <strong>range()</strong> - Creates a sequence of numbers (0 to ${num-1})`;
        }
        else {
          explanation = `💻 <strong>Code line</strong> - This does something in Python`;
        }
      }

      // JavaScript explanations
      else if (language === 'javascript') {
        if (trimmedLine.includes('console.log(')) {
          const content = trimmedLine.match(/console\.log\((.*?)\)/)?.[1] || '';
          explanation = `📢 <strong>console.log()</strong> - Displays text in the output. It shows: ${content}`;
        }
        else if (trimmedLine.includes('let ') || trimmedLine.includes('const ') || trimmedLine.includes('var ')) {
          const varName = trimmedLine.match(/(let|const|var)\s+(\w+)/)?.[2] || '';
          explanation = `📦 <strong>Variable</strong> - Creates a box called "${varName}" to store information`;
        }
        else if (trimmedLine.startsWith('for ')) {
          explanation = `🔁 <strong>for loop</strong> - Repeats the code inside multiple times`;
        }
        else if (trimmedLine.startsWith('if ')) {
          explanation = `❓ <strong>if statement</strong> - Checks if something is true, then decides what to do`;
        }
        else if (trimmedLine.startsWith('else')) {
          explanation = `↔️ <strong>else</strong> - If the "if" was false, do this instead`;
        }
        else if (trimmedLine.startsWith('function ')) {
          const funcName = trimmedLine.match(/function\s+(\w+)/)?.[1] || '';
          explanation = `⚙️ <strong>function</strong> - Creates reusable code called "${funcName}"`;
        }
        else {
          explanation = `💻 <strong>Code line</strong> - This does something in JavaScript`;
        }
      }

      // HTML explanations
      else if (language === 'html') {
        if (trimmedLine.includes('<h1')) {
          explanation = `📰 <strong>&lt;h1&gt;</strong> - Big heading (title) - the largest text on the page`;
        }
        else if (trimmedLine.includes('<h2')) {
          explanation = `📰 <strong>&lt;h2&gt;</strong> - Medium heading - smaller than h1`;
        }
        else if (trimmedLine.includes('<p')) {
          explanation = `📝 <strong>&lt;p&gt;</strong> - Paragraph - regular text content`;
        }
        else if (trimmedLine.includes('<div')) {
          explanation = `📦 <strong>&lt;div&gt;</strong> - Container - groups other elements together`;
        }
        else if (trimmedLine.includes('<a ')) {
          explanation = `🔗 <strong>&lt;a&gt;</strong> - Link - clicking it takes you to another page`;
        }
        else if (trimmedLine.includes('<img')) {
          explanation = `🖼️ <strong>&lt;img&gt;</strong> - Image - displays a picture`;
        }
        else if (trimmedLine.includes('<button')) {
          explanation = `🔘 <strong>&lt;button&gt;</strong> - Button - user can click it`;
        }
        else if (trimmedLine.includes('<ul')) {
          explanation = `📋 <strong>&lt;ul&gt;</strong> - Unordered list - bullet point list`;
        }
        else if (trimmedLine.includes('<li')) {
          explanation = `• <strong>&lt;li&gt;</strong> - List item - one item in a list`;
        }
        else if (trimmedLine.includes('style=')) {
          explanation = `🎨 <strong>style</strong> - CSS styling - changes colors, sizes, etc.`;
        }
        else if (trimmedLine.includes('<!DOCTYPE')) {
          explanation = `📄 <strong>&lt;!DOCTYPE html&gt;</strong> - Tells browser this is an HTML5 document`;
        }
        else if (trimmedLine.includes('<html')) {
          explanation = `🌐 <strong>&lt;html&gt;</strong> - Root element - contains all HTML`;
        }
        else if (trimmedLine.includes('<body')) {
          explanation = `👤 <strong>&lt;body&gt;</strong> - Body - contains all visible content`;
        }
        else if (trimmedLine.includes('<script')) {
          explanation = `⚡ <strong>&lt;script&gt;</strong> - JavaScript code - adds interactivity`;
        }
        else {
          explanation = `💻 <strong>HTML tag</strong> - Part of the webpage structure`;
        }
      }

      if (explanation) {
        explanations.push({
          line: index + 1,
          code: line,
          explanation: explanation
        });
      }
    });

    return explanations.length > 0 ? explanations : [{
      line: 0,
      text: "No code to explain yet. Start typing some code!"
    }];
  };

  const explanations = explainCode();

  return (
    <div className="mb-6">
      <button
        onClick={() => setShowExplanation(!showExplanation)}
        className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        💡 {showExplanation ? 'Hide' : 'Explain This Code'} - Learn What Each Line Does
      </button>

      {showExplanation && (
        <div className="mt-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border-4 border-yellow-300">
          <div className="mb-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 border-2 border-yellow-300">
            <h3 className="text-2xl font-black text-gray-800 mb-2">
              🎓 Understanding Your Code
            </h3>
            <p className="text-gray-700">
              Here's what each line does, explained in simple terms:
            </p>
          </div>

          <div className="space-y-3">
            {explanations.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-l-4 border-yellow-500">
                {item.code ? (
                  <>
                    <div className="flex items-start gap-3 mb-2">
                      <span className="bg-yellow-500 text-white font-bold px-2 py-1 rounded text-xs">
                        Line {item.line}
                      </span>
                      <code className="flex-1 text-sm bg-gray-800 text-green-400 p-2 rounded font-mono">
                        {item.code}
                      </code>
                    </div>
                    <div 
                      className="text-gray-800 ml-14"
                      dangerouslySetInnerHTML={{ __html: item.explanation }}
                    />
                  </>
                ) : (
                  <p className="text-gray-700">{item.text}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-300">
            <h4 className="font-bold text-gray-800 mb-2">💡 Pro Tips:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>Read the explanation for each line</li>
              <li>Try changing the code and see what happens</li>
              <li>Click "Run Code" to test your changes</li>
              <li>Experiment and learn by doing!</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default CodeExplainer;