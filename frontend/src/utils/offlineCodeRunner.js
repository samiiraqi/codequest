// Run Python code in browser (offline!)
export const runPythonOffline = async (code) => {
  try {
    // Use Pyodide (Python in browser)
    if (!window.pyodide) {
      const pyodideScript = document.createElement('script');
      pyodideScript.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
      document.head.appendChild(pyodideScript);
      
      await new Promise((resolve) => {
        pyodideScript.onload = resolve;
      });
      
      window.pyodide = await loadPyodide();
    }

    const output = await window.pyodide.runPythonAsync(code);
    return {
      status: 'success',
      output: output || 'Code executed successfully!',
      execution_time: 0
    };
  } catch (error) {
    return {
      status: 'error',
      error: error.message,
      execution_time: 0
    };
  }
};

// Run JavaScript code in browser (offline!)
export const runJavaScriptOffline = (code) => {
  try {
    // Capture console.log output
    let output = '';
    const originalLog = console.log;
    console.log = (...args) => {
      output += args.join(' ') + '\n';
    };

    // Run code
    eval(code);

    // Restore console.log
    console.log = originalLog;

    return {
      status: 'success',
      output: output || 'Code executed successfully!',
      execution_time: 0
    };
  } catch (error) {
    console.log = console.log;
    return {
      status: 'error',
      error: error.message,
      execution_time: 0
    };
  }
};

// Run HTML code in browser (offline!)
export const runHTMLOffline = (code) => {
  return {
    status: 'success',
    output: code,
    execution_time: 0
  };
};

// Check if online
export const isOnline = () => {
  return navigator.onLine;
};