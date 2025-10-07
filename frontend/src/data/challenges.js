export const challenges = {
  python: [
    {
      id: 'py_challenge_1',
      title: 'Fix the Bug! 🐛',
      difficulty: 'beginner',
      description: 'This code has a typo. Can you find and fix it?',
      starterCode: '# Fix the typo\nprnt("Hello World")',
      solution: 'print("Hello World")',
      hint: 'Check the print statement spelling',
      expectedOutput: 'Hello World',
      explanation: 'The correct spelling is print() not prnt()'
    },
    {
      id: 'py_challenge_2',
      title: 'Complete the Code 📝',
      difficulty: 'beginner',
      description: 'Fill in the blank to make this code work',
      starterCode: '# Complete the code\nx = 5\ny = 3\nprint(x ___ y)  # Should output 8',
      solution: 'x = 5\ny = 3\nprint(x + y)',
      hint: 'Use the addition operator',
      expectedOutput: '8',
      explanation: 'Use + to add two numbers together'
    },
    {
      id: 'py_challenge_3',
      title: 'Loop Challenge 🔁',
      difficulty: 'beginner',
      description: 'Make a loop that counts from 1 to 3',
      starterCode: '# Write a loop\nfor i in range(???):\n    print(i)',
      solution: 'for i in range(1, 4):\n    print(i)',
      hint: 'range(1, 4) gives you 1, 2, 3',
      expectedOutput: '1\n2\n3',
      explanation: 'range(1, 4) generates numbers from 1 to 3'
    },
    {
      id: 'py_challenge_4',
      title: 'Variable Swap 🔄',
      difficulty: 'intermediate',
      description: 'Swap the values of two variables',
      starterCode: '# Swap a and b\na = 10\nb = 20\n# Your code here\nprint(f"a={a}, b={b}")  # Should print a=20, b=10',
      solution: 'a = 10\nb = 20\na, b = b, a\nprint(f"a={a}, b={b}")',
      hint: 'Python can swap in one line: a, b = b, a',
      expectedOutput: 'a=20, b=10',
      explanation: 'Python allows tuple unpacking to swap values'
    },
    {
      id: 'py_challenge_5',
      title: 'Find the Maximum 📊',
      difficulty: 'intermediate',
      description: 'Find the largest number in a list',
      starterCode: '# Find max\nnumbers = [5, 12, 3, 18, 7]\n# Your code here\nprint(result)',
      solution: 'numbers = [5, 12, 3, 18, 7]\nresult = max(numbers)\nprint(result)',
      hint: 'Use the max() function',
      expectedOutput: '18',
      explanation: 'max() returns the largest value in a list'
    },
    {
      id: 'py_challenge_6',
      title: 'Reverse a String 🔄',
      difficulty: 'intermediate',
      description: 'Reverse the word "Python"',
      starterCode: '# Reverse it\nword = "Python"\n# Your code here\nprint(reversed_word)',
      solution: 'word = "Python"\nreversed_word = word[::-1]\nprint(reversed_word)',
      hint: 'Use slicing with [::-1]',
      expectedOutput: 'nohtyP',
      explanation: '[::-1] reverses a string using slicing'
    },
    {
      id: 'py_challenge_7',
      title: 'Count Vowels 🔢',
      difficulty: 'advanced',
      description: 'Count how many vowels are in "CodeQuest"',
      starterCode: '# Count vowels\nword = "CodeQuest"\nvowels = "aeiouAEIOU"\ncount = 0\n# Your code here\nprint(count)',
      solution: 'word = "CodeQuest"\nvowels = "aeiouAEIOU"\ncount = 0\nfor letter in word:\n    if letter in vowels:\n        count += 1\nprint(count)',
      hint: 'Loop through each letter and check if it\'s in vowels',
      expectedOutput: '4',
      explanation: 'CodeQuest has 4 vowels: o, e, u, e'
    },
    {
      id: 'py_challenge_8',
      title: 'Sum of Even Numbers 🔢',
      difficulty: 'advanced',
      description: 'Find sum of even numbers from 1 to 10',
      starterCode: '# Sum even numbers\ntotal = 0\n# Your code here\nprint(total)',
      solution: 'total = 0\nfor i in range(1, 11):\n    if i % 2 == 0:\n        total += i\nprint(total)',
      hint: 'Use % 2 == 0 to check if even',
      expectedOutput: '30',
      explanation: '2+4+6+8+10 = 30'
    },
  ],
  
  javascript: [
    {
      id: 'js_challenge_1',
      title: 'Fix the Bug! 🐛',
      difficulty: 'beginner',
      description: 'This code has a typo. Fix it!',
      starterCode: '// Fix the typo\nconsol.log("Hello World");',
      solution: 'console.log("Hello World");',
      hint: 'Check the console spelling',
      expectedOutput: 'Hello World',
      explanation: 'The correct spelling is console not consol'
    },
    {
      id: 'js_challenge_2',
      title: 'Complete the Function 📝',
      difficulty: 'beginner',
      description: 'Complete the addition function',
      starterCode: '// Complete it\nfunction add(a, b) {\n  return a ___ b;\n}\nconsole.log(add(5, 3));',
      solution: 'function add(a, b) {\n  return a + b;\n}\nconsole.log(add(5, 3));',
      hint: 'Use the + operator',
      expectedOutput: '8',
      explanation: 'Use + to add two numbers'
    },
    {
      id: 'js_challenge_3',
      title: 'Array Length 📏',
      difficulty: 'beginner',
      description: 'Get the length of the array',
      starterCode: '// Find length\nconst fruits = ["apple", "banana", "orange"];\nconsole.log(???);',
      solution: 'const fruits = ["apple", "banana", "orange"];\nconsole.log(fruits.length);',
      hint: 'Use the .length property',
      expectedOutput: '3',
      explanation: 'Arrays have a .length property'
    },
    {
      id: 'js_challenge_4',
      title: 'Arrow Function 🎯',
      difficulty: 'intermediate',
      description: 'Convert to arrow function',
      starterCode: '// Convert to arrow\nfunction square(n) {\n  return n * n;\n}\nconsole.log(square(5));',
      solution: 'const square = (n) => n * n;\nconsole.log(square(5));',
      hint: 'Use => syntax',
      expectedOutput: '25',
      explanation: 'Arrow functions are shorter: (n) => n * n'
    },
    {
      id: 'js_challenge_5',
      title: 'Filter Evens 🔢',
      difficulty: 'intermediate',
      description: 'Filter only even numbers',
      starterCode: '// Filter evens\nconst nums = [1,2,3,4,5,6];\nconst evens = nums.filter(???);\nconsole.log(evens);',
      solution: 'const nums = [1,2,3,4,5,6];\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log(evens);',
      hint: 'Use n => n % 2 === 0',
      expectedOutput: '[ 2, 4, 6 ]',
      explanation: 'filter() keeps elements that pass the test'
    },
    {
      id: 'js_challenge_6',
      title: 'Sum Array 🔢',
      difficulty: 'advanced',
      description: 'Sum all numbers in array',
      starterCode: '// Sum array\nconst nums = [1, 2, 3, 4, 5];\nconst sum = ???;\nconsole.log(sum);',
      solution: 'const nums = [1, 2, 3, 4, 5];\nconst sum = nums.reduce((a, b) => a + b, 0);\nconsole.log(sum);',
      hint: 'Use reduce() with (a, b) => a + b',
      expectedOutput: '15',
      explanation: 'reduce() combines all values'
    },
  ],

  html: [
    {
      id: 'html_challenge_1',
      title: 'Fix the Tag! 🏷️',
      difficulty: 'beginner',
      description: 'This tag is not closed. Fix it!',
      starterCode: '<h1>Hello World',
      solution: '<h1>Hello World</h1>',
      hint: 'Close the h1 tag with </h1>',
      expectedOutput: 'Hello World',
      explanation: 'HTML tags must be closed with </tagname>'
    },
    {
      id: 'html_challenge_2',
      title: 'Add a Link 🔗',
      difficulty: 'beginner',
      description: 'Make "Click Here" a link to google.com',
      starterCode: '<p>Click Here</p>',
      solution: '<a href="https://google.com">Click Here</a>',
      hint: 'Use <a href="...">',
      expectedOutput: 'Click Here',
      explanation: '<a> tag creates hyperlinks'
    },
    {
      id: 'html_challenge_3',
      title: 'Style It Blue 💙',
      difficulty: 'beginner',
      description: 'Make the text blue',
      starterCode: '<p>Blue Text</p>',
      solution: '<p style="color: blue;">Blue Text</p>',
      hint: 'Use style="color: blue;"',
      expectedOutput: 'Blue Text',
      explanation: 'Use style attribute for inline CSS'
    },
    {
      id: 'html_challenge_4',
      title: 'Create a Button 🔘',
      difficulty: 'intermediate',
      description: 'Create a styled button',
      starterCode: '<!-- Create button -->\n<button>Click Me</button>',
      solution: '<button style="background: blue; color: white; padding: 10px 20px; border: none; border-radius: 5px;">Click Me</button>',
      hint: 'Add style with background, color, padding',
      expectedOutput: 'Click Me',
      explanation: 'Style buttons with CSS'
    },
    {
      id: 'html_challenge_5',
      title: 'Gradient Box 🌈',
      difficulty: 'advanced',
      description: 'Create a box with gradient background',
      starterCode: '<div>Gradient Box</div>',
      solution: '<div style="background: linear-gradient(to right, purple, pink); color: white; padding: 20px; border-radius: 10px;">Gradient Box</div>',
      hint: 'Use linear-gradient(to right, color1, color2)',
      expectedOutput: 'Gradient Box',
      explanation: 'linear-gradient creates color transitions'
    },
  ]
};