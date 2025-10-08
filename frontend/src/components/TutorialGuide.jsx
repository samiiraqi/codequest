import { useState } from 'react';

function TutorialGuide({ language, onLoadCode }) {
  const [showTutorial, setShowTutorial] = useState(false);

  const tutorials = {
    python: [
      {
        title: "👋 Your First Program - Hello World",
        description: "Learn how to display text on the screen",
        code: `# This is a comment - Python ignores this line
# The print() function displays text

print("Hello, World!")
print("I am learning Python!")`,
        explanation: "The print() function shows text on the screen. Text must be inside quotes."
      },
      {
        title: "🔢 Working with Numbers",
        description: "Learn how to do math in Python",
        code: `# Python can do math!
x = 5
y = 3

print("Addition:", x + y)
print("Subtraction:", x - y)
print("Multiplication:", x * y)`,
        explanation: "Store numbers in variables (like boxes) and do math with +, -, *, /"
      },
      {
        title: "🔁 Repeat Things with Loops",
        description: "Make Python repeat actions",
        code: `# A loop repeats code multiple times
for i in range(5):
    print("Count:", i)
    
print("Done counting!")`,
        explanation: "The 'for' loop repeats code. range(5) means repeat 5 times (0,1,2,3,4)"
      },
      {
        title: "❓ Make Decisions with If",
        description: "Let Python make choices",
        code: `# If statements make decisions
age = 15

if age < 18:
    print("You are a minor")
else:
    print("You are an adult")`,
        explanation: "If statements check conditions and run different code based on true/false"
      }
    ],
    javascript: [
      {
        title: "👋 Your First Program - Hello World",
        description: "Learn how to display text",
        code: `// This is a comment - JavaScript ignores this
// console.log() displays text

console.log("Hello, World!");
console.log("I am learning JavaScript!");`,
        explanation: "console.log() shows text in the output. Text must be inside quotes."
      },
      {
        title: "🔢 Working with Numbers",
        description: "Learn how to do math",
        code: `// JavaScript can do math!
let x = 5;
let y = 3;

console.log("Addition:", x + y);
console.log("Subtraction:", x - y);
console.log("Multiplication:", x * y);`,
        explanation: "Use 'let' to create variables. Do math with +, -, *, /"
      },
      {
        title: "🔁 Repeat Things with Loops",
        description: "Make JavaScript repeat actions",
        code: `// A loop repeats code multiple times
for (let i = 0; i < 5; i++) {
    console.log("Count:", i);
}

console.log("Done counting!");`,
        explanation: "The 'for' loop repeats code. This loop counts from 0 to 4"
      },
      {
        title: "❓ Make Decisions with If",
        description: "Let JavaScript make choices",
        code: `// If statements make decisions
let age = 15;

if (age < 18) {
    console.log("You are a minor");
} else {
    console.log("You are an adult");
}`,
        explanation: "If statements check conditions and run different code"
      }
    ],
    html: [
      {
        title: "👋 Your First Webpage",
        description: "Create a simple webpage",
        code: `<!DOCTYPE html>
<html>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first webpage!</p>
</body>
</html>`,
        explanation: "HTML uses tags like <h1> for headings and <p> for paragraphs"
      },
      {
        title: "🎨 Add Colors",
        description: "Make your page colorful",
        code: `<!DOCTYPE html>
<html>
<body>
    <h1 style="color: blue;">Blue Heading</h1>
    <p style="color: red;">Red paragraph</p>
    <p style="background: yellow;">Yellow background</p>
</body>
</html>`,
        explanation: "Use style='color: ...' to change colors"
      },
      {
        title: "🔗 Add Links",
        description: "Create clickable links",
        code: `<!DOCTYPE html>
<html>
<body>
    <h1>My Favorite Sites</h1>
    <a href="https://google.com">Go to Google</a>
    <br>
    <a href="https://youtube.com">Go to YouTube</a>
</body>
</html>`,
        explanation: "The <a> tag creates links. href='...' tells where to go"
      },
      {
        title: "📋 Make a List",
        description: "Create lists of items",
        code: `<!DOCTYPE html>
<html>
<body>
    <h1>My To-Do List</h1>
    <ul>
        <li>Learn HTML</li>
        <li>Practice coding</li>
        <li>Build a website</li>
    </ul>
</body>
</html>`,
        explanation: "<ul> creates a list, <li> is each item in the list"
      }
    ]
  };

  const currentTutorials = tutorials[language] || [];

  return (
    <div className="mb-6">
      <button
        onClick={() => setShowTutorial(!showTutorial)}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        📚 {showTutorial ? 'Hide' : 'Show'} Beginner Tutorials ({currentTutorials.length} lessons)
      </button>

      {showTutorial && (
        <div className="mt-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border-4 border-white/50">
          <div className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 border-2 border-blue-200">
            <h3 className="text-xl font-black text-gray-800 mb-2">
              🎓 Learn {language === 'python' ? 'Python' : language === 'javascript' ? 'JavaScript' : 'HTML'} Step by Step!
            </h3>
            <p className="text-gray-700">
              Click any lesson below to load the code into the editor. Then click "🚀 Run Code" to see it work!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentTutorials.map((tutorial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 border-2 border-gray-200 hover:border-purple-400 transition-all cursor-pointer transform hover:scale-105 shadow-md hover:shadow-xl"
                onClick={() => {
                  onLoadCode(tutorial.code);
                  setShowTutorial(false);
                  alert(`✅ "${tutorial.title}" loaded! Now click the green "🚀 Run Code" button below to see it work!`);
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{index + 1}️⃣</span>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">{tutorial.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{tutorial.description}</p>
                  </div>
                </div>

                <div className="bg-gray-50 border-l-4 border-purple-500 p-3 rounded-lg mb-3">
                  <p className="text-xs text-gray-700 font-medium">
                    💡 {tutorial.explanation}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">
                    Click to try this code →
                  </span>
                  <span className="text-2xl">▶️</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-300">
            <h4 className="font-bold text-gray-800 mb-2">🎯 How to Use:</h4>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li>Click any lesson above to load code</li>
              <li>Click the green "🚀 Run Code" button</li>
              <li>See the result in the output below!</li>
              <li>Try changing the code and run it again</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

export default TutorialGuide;