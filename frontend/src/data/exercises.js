export const exercises = {
  python: [
    {
      id: 'py_hello',
      title: '👋 Hello World',
      description: 'Print your first message',
      difficulty: 'beginner',
      code: '# Hello World\nprint("Hello, CodeQuest!")',
      hint: 'Use print() to display text'
    },
    {
      id: 'py_math',
      title: '➕ Math Operations',
      description: 'Add and multiply numbers',
      difficulty: 'beginner',
      code: '# Math Operations\nx = 5\ny = 3\nprint(f"{x} + {y} = {x + y}")\nprint(f"{x} * {y} = {x * y}")',
      hint: 'Use + for addition, * for multiplication'
    },
    {
      id: 'py_loop',
      title: '🔁 For Loop',
      description: 'Count from 1 to 5',
      difficulty: 'beginner',
      code: '# Loop Example\nfor i in range(1, 6):\n    print(f"Count: {i}")',
      hint: 'range(1, 6) goes from 1 to 5'
    },
    {
      id: 'py_pattern',
      title: '🎨 Star Pattern',
      description: 'Draw a star pattern',
      difficulty: 'beginner',
      code: '# Draw Pattern\nfor i in range(5):\n    print("⭐" * (i + 1))',
      hint: 'Use * to repeat strings'
    },
    {
      id: 'py_variables',
      title: '📦 Variables',
      description: 'Store and use values',
      difficulty: 'beginner',
      code: '# Variables\nname = "Alex"\nage = 12\nprint(f"My name is {name}")\nprint(f"I am {age} years old")',
      hint: 'Variables store data for later use'
    },
    {
      id: 'py_if',
      title: '🤔 If Statements',
      description: 'Make decisions in code',
      difficulty: 'intermediate',
      code: '# If Statement\nage = 15\nif age >= 13:\n    print("You are a teenager!")\nelse:\n    print("You are a kid!")',
      hint: 'if checks a condition'
    },
    {
      id: 'py_list',
      title: '📋 Lists',
      description: 'Work with multiple items',
      difficulty: 'intermediate',
      code: '# Lists\nfruits = ["🍎", "🍌", "🍊", "🍇"]\nfor fruit in fruits:\n    print(f"I like {fruit}")',
      hint: 'Lists hold multiple values in order'
    },
    {
      id: 'py_function',
      title: '🎯 Functions',
      description: 'Create reusable code',
      difficulty: 'intermediate',
      code: '# Function\ndef greet(name):\n    print(f"Hello, {name}!")\n\ngreet("Alice")\ngreet("Bob")',
      hint: 'Functions let you reuse code'
    },
    {
      id: 'py_while',
      title: '🔄 While Loop',
      description: 'Loop until a condition',
      difficulty: 'intermediate',
      code: '# While Loop\ncount = 1\nwhile count <= 5:\n    print(f"Count: {count}")\n    count += 1',
      hint: 'while repeats as long as condition is true'
    },
    {
      id: 'py_input_sim',
      title: '💬 User Input (Simulated)',
      description: 'Work with user input',
      difficulty: 'intermediate',
      code: '# Simulated Input\nname = "Sam"  # In real programs: input("Your name: ")\nprint(f"Welcome, {name}!")',
      hint: 'We simulate input since browser cannot use input()'
    },
    {
      id: 'py_calculator',
      title: '🧮 Simple Calculator',
      description: 'Build a calculator',
      difficulty: 'intermediate',
      code: '# Calculator\na = 10\nb = 5\nprint(f"Add: {a + b}")\nprint(f"Subtract: {a - b}")\nprint(f"Multiply: {a * b}")\nprint(f"Divide: {a / b}")',
      hint: 'Use +, -, *, / operators'
    },
    {
      id: 'py_temp',
      title: '🌡️ Temperature Converter',
      description: 'Convert Celsius to Fahrenheit',
      difficulty: 'intermediate',
      code: '# Temperature Converter\ncelsius = 25\nfahrenheit = (celsius * 9/5) + 32\nprint(f"{celsius}°C = {fahrenheit}°F")',
      hint: 'Formula: (C × 9/5) + 32'
    },
    {
      id: 'py_even_odd',
      title: '🔢 Even or Odd',
      description: 'Check if number is even/odd',
      difficulty: 'intermediate',
      code: '# Even or Odd\nfor num in range(1, 11):\n    if num % 2 == 0:\n        print(f"{num} is even")\n    else:\n        print(f"{num} is odd")',
      hint: 'Use % (modulo) to find remainder'
    },
    {
      id: 'py_pyramid',
      title: '🗻 Number Pyramid',
      description: 'Draw a number pyramid',
      difficulty: 'advanced',
      code: '# Number Pyramid\nfor i in range(1, 6):\n    for j in range(1, i + 1):\n        print(j, end=" ")\n    print()',
      hint: 'Use nested loops'
    },
    {
      id: 'py_fizzbuzz',
      title: '🎮 FizzBuzz Game',
      description: 'Classic coding challenge',
      difficulty: 'advanced',
      code: '# FizzBuzz\nfor i in range(1, 16):\n    if i % 3 == 0 and i % 5 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
      hint: 'Check for multiples of 3 and 5'
    },
  ],
  
  javascript: [
    {
      id: 'js_hello',
      title: '👋 Hello World',
      description: 'Print your first message',
      difficulty: 'beginner',
      code: '// Hello World\nconsole.log("Hello, CodeQuest!");',
      hint: 'Use console.log() to print'
    },
    {
      id: 'js_math',
      title: '➕ Math Operations',
      description: 'Add and multiply numbers',
      difficulty: 'beginner',
      code: '// Math Operations\nconst x = 5;\nconst y = 3;\nconsole.log(`${x} + ${y} = ${x + y}`);\nconsole.log(`${x} * ${y} = ${x * y}`);',
      hint: 'Use template literals with ${}'
    },
    {
      id: 'js_loop',
      title: '🔁 For Loop',
      description: 'Count from 1 to 5',
      difficulty: 'beginner',
      code: '// Loop Example\nfor (let i = 1; i <= 5; i++) {\n  console.log(`Count: ${i}`);\n}',
      hint: 'for loops have init, condition, increment'
    },
    {
      id: 'js_array',
      title: '📋 Arrays',
      description: 'Work with arrays',
      difficulty: 'beginner',
      code: '// Array Example\nconst fruits = ["🍎", "🍌", "🍊"];\nfruits.forEach(fruit => {\n  console.log(fruit);\n});',
      hint: 'Arrays store multiple values'
    },
    {
      id: 'js_variables',
      title: '📦 Variables',
      description: 'const, let, and var',
      difficulty: 'beginner',
      code: '// Variables\nconst name = "Alex";\nlet age = 12;\nconsole.log(`My name is ${name}`);\nconsole.log(`I am ${age} years old`);',
      hint: 'Use const for constants, let for variables'
    },
    {
      id: 'js_if',
      title: '🤔 If Statements',
      description: 'Make decisions',
      difficulty: 'intermediate',
      code: '// If Statement\nconst age = 15;\nif (age >= 13) {\n  console.log("You are a teenager!");\n} else {\n  console.log("You are a kid!");\n}',
      hint: 'if checks conditions'
    },
    {
      id: 'js_function',
      title: '🎯 Functions',
      description: 'Create reusable code',
      difficulty: 'intermediate',
      code: '// Function\nfunction greet(name) {\n  console.log(`Hello, ${name}!`);\n}\n\ngreet("Alice");\ngreet("Bob");',
      hint: 'Functions encapsulate code'
    },
    {
      id: 'js_arrow',
      title: '➡️ Arrow Functions',
      description: 'Modern function syntax',
      difficulty: 'intermediate',
      code: '// Arrow Function\nconst square = (n) => n * n;\n\nconsole.log(square(5));\nconsole.log(square(10));',
      hint: 'Arrow functions are shorter syntax'
    },
    {
      id: 'js_object',
      title: '🎁 Objects',
      description: 'Store related data',
      difficulty: 'intermediate',
      code: '// Objects\nconst person = {\n  name: "Sam",\n  age: 12,\n  hobby: "coding"\n};\n\nconsole.log(`${person.name} is ${person.age}`);\nconsole.log(`Hobby: ${person.hobby}`);',
      hint: 'Objects group related data'
    },
    {
      id: 'js_map',
      title: '🗺️ Map Function',
      description: 'Transform arrays',
      difficulty: 'intermediate',
      code: '// Map Function\nconst numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconsole.log(doubled);',
      hint: 'map() transforms each element'
    },
    {
      id: 'js_filter',
      title: '🔍 Filter Function',
      description: 'Filter array elements',
      difficulty: 'intermediate',
      code: '// Filter Function\nconst numbers = [1, 2, 3, 4, 5, 6, 7, 8];\nconst evens = numbers.filter(n => n % 2 === 0);\nconsole.log("Even numbers:", evens);',
      hint: 'filter() selects elements'
    },
    {
      id: 'js_template',
      title: '📝 Template Literals',
      description: 'String formatting',
      difficulty: 'intermediate',
      code: '// Template Literals\nconst name = "Alex";\nconst score = 95;\nconsole.log(`${name} scored ${score}%`);\nconsole.log(`Grade: ${score >= 90 ? "A" : "B"}`);',
      hint: 'Use backticks for templates'
    },
    {
      id: 'js_spread',
      title: '📤 Spread Operator',
      description: 'Expand arrays/objects',
      difficulty: 'advanced',
      code: '// Spread Operator\nconst arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\nconst combined = [...arr1, ...arr2];\nconsole.log(combined);',
      hint: '... spreads array elements'
    },
    {
      id: 'js_destructure',
      title: '📦 Destructuring',
      description: 'Extract values easily',
      difficulty: 'advanced',
      code: '// Destructuring\nconst person = { name: "Sam", age: 12 };\nconst { name, age } = person;\nconsole.log(name);\nconsole.log(age);',
      hint: 'Extract object properties'
    },
    {
      id: 'js_reduce',
      title: '🔢 Reduce Function',
      description: 'Sum array values',
      difficulty: 'advanced',
      code: '// Reduce Function\nconst numbers = [1, 2, 3, 4, 5];\nconst sum = numbers.reduce((acc, n) => acc + n, 0);\nconsole.log(`Sum: ${sum}`);',
      hint: 'reduce() combines values'
    },
  ],

  html: [
    {
      id: 'html_hello',
      title: '👋 Hello World',
      description: 'Basic HTML structure',
      difficulty: 'beginner',
      code: '<h1>Hello World</h1>\n<p>Welcome to CodeQuest!</p>',
      hint: 'h1 is for headings, p for paragraphs'
    },
    {
      id: 'html_style',
      title: '🎨 Inline Styles',
      description: 'Add colors and styles',
      difficulty: 'beginner',
      code: '<h1 style="color: blue;">Styled Header</h1>\n<p style="background: yellow; padding: 10px;">Styled paragraph</p>',
      hint: 'Use style attribute for CSS'
    },
    {
      id: 'html_list',
      title: '📋 Lists',
      description: 'Create a list',
      difficulty: 'beginner',
      code: '<ul>\n  <li>Apple 🍎</li>\n  <li>Banana 🍌</li>\n  <li>Orange 🍊</li>\n</ul>',
      hint: 'ul = unordered list, li = list item'
    },
    {
      id: 'html_card',
      title: '📦 Card',
      description: 'Create a styled card',
      difficulty: 'beginner',
      code: '<div style="border: 2px solid blue; padding: 20px; border-radius: 10px;">\n  <h2>Card Title</h2>\n  <p>Card content</p>\n</div>',
      hint: 'div is a container element'
    },
    {
      id: 'html_link',
      title: '🔗 Links',
      description: 'Add clickable links',
      difficulty: 'beginner',
      code: '<h2>My Favorite Sites</h2>\n<a href="https://google.com" target="_blank">Google</a><br>\n<a href="https://github.com" target="_blank">GitHub</a>',
      hint: 'a tag creates links'
    },
    {
      id: 'html_image',
      title: '🖼️ Images',
      description: 'Display images',
      difficulty: 'intermediate',
      code: '<h2>Beautiful Image</h2>\n<img src="https://picsum.photos/300/200" alt="Random" style="border-radius: 10px;">',
      hint: 'img tag displays images'
    },
    {
      id: 'html_button',
      title: '🔘 Buttons',
      description: 'Create styled buttons',
      difficulty: 'intermediate',
      code: '<button style="background: blue; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">Click Me!</button>',
      hint: 'button creates clickable buttons'
    },
    {
      id: 'html_table',
      title: '📊 Table',
      description: 'Create a data table',
      difficulty: 'intermediate',
      code: '<table style="border-collapse: collapse; width: 100%;">\n  <tr style="background: lightblue;">\n    <th style="border: 1px solid black; padding: 8px;">Name</th>\n    <th style="border: 1px solid black; padding: 8px;">Age</th>\n  </tr>\n  <tr>\n    <td style="border: 1px solid black; padding: 8px;">Alice</td>\n    <td style="border: 1px solid black; padding: 8px;">12</td>\n  </tr>\n</table>',
      hint: 'table, tr, th, td create tables'
    },
    {
      id: 'html_form',
      title: '📝 Form',
      description: 'Create input form',
      difficulty: 'intermediate',
      code: '<form style="padding: 20px; background: #f0f0f0; border-radius: 10px;">\n  <label>Name:</label><br>\n  <input type="text" placeholder="Enter your name" style="padding: 8px; margin: 10px 0;"><br>\n  <button type="submit" style="padding: 10px 20px; background: green; color: white; border: none; border-radius: 5px;">Submit</button>\n</form>',
      hint: 'form, input, label create forms'
    },
    {
      id: 'html_gradient',
      title: '🌈 Gradient Box',
      description: 'CSS gradient background',
      difficulty: 'intermediate',
      code: '<div style="background: linear-gradient(to right, purple, pink); color: white; padding: 30px; border-radius: 15px; text-align: center;">\n  <h2>Gradient Magic!</h2>\n  <p>Beautiful colors everywhere! 🎨</p>\n</div>',
      hint: 'linear-gradient creates color gradients'
    },
    {
      id: 'html_grid',
      title: '📐 Grid Layout',
      description: 'Create grid of boxes',
      difficulty: 'advanced',
      code: '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">\n  <div style="background: red; color: white; padding: 20px; text-align: center;">Box 1</div>\n  <div style="background: green; color: white; padding: 20px; text-align: center;">Box 2</div>\n  <div style="background: blue; color: white; padding: 20px; text-align: center;">Box 3</div>\n</div>',
      hint: 'CSS Grid creates layouts'
    },
    {
      id: 'html_flex',
      title: '🔲 Flexbox',
      description: 'Flexible box layout',
      difficulty: 'advanced',
      code: '<div style="display: flex; justify-content: space-around; padding: 20px; background: lightgray;">\n  <div style="background: orange; padding: 15px; border-radius: 8px;">Item 1</div>\n  <div style="background: teal; padding: 15px; border-radius: 8px;">Item 2</div>\n  <div style="background: purple; padding: 15px; border-radius: 8px;">Item 3</div>\n</div>',
      hint: 'Flexbox aligns items flexibly'
    },
    {
      id: 'html_animation',
      title: '✨ CSS Animation',
      description: 'Animated text',
      difficulty: 'advanced',
      code: '<style>\n  @keyframes bounce {\n    0%, 100% { transform: translateY(0); }\n    50% { transform: translateY(-20px); }\n  }\n</style>\n<h1 style="animation: bounce 1s infinite; color: purple; text-align: center;">Bouncing Text! 🎉</h1>',
      hint: '@keyframes defines animations'
    },
    {
      id: 'html_shadow',
      title: '🌑 Box Shadow',
      description: 'Add depth with shadows',
      difficulty: 'advanced',
      code: '<div style="background: white; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); border-radius: 15px; max-width: 300px; margin: 20px auto;">\n  <h3>Shadow Box</h3>\n  <p>This box has a beautiful shadow effect!</p>\n</div>',
      hint: 'box-shadow adds depth'
    },
    {
      id: 'html_profile',
      title: '👤 Profile Card',
      description: 'Complete profile card',
      difficulty: 'advanced',
      code: '<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; border-radius: 20px; text-align: center; max-width: 300px; margin: auto;">\n  <div style="width: 100px; height: 100px; background: white; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 50px;">👤</div>\n  <h2 style="margin: 0;">Alex Coder</h2>\n  <p style="opacity: 0.9;">Future Developer 🚀</p>\n  <button style="background: white; color: #667eea; border: none; padding: 10px 30px; border-radius: 25px; font-weight: bold; margin-top: 10px;">Follow</button>\n</div>',
      hint: 'Combine all techniques!'
    },
  ]
};