// Python offline runner with better loading
let pyodideLoading = null;
let pyodideReady = false;

export const loadPyodideIfNeeded = async () => {
  if (pyodideReady && window.pyodide) {
    return window.pyodide;
  }

  if (pyodideLoading) {
    return pyodideLoading;
  }

  pyodideLoading = (async () => {
    try {
      // Load Pyodide script
      if (!window.loadPyodide) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        document.head.appendChild(script);
        
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });
      }

      // Initialize Pyodide
      window.pyodide = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
      });
      
      pyodideReady = true;
      return window.pyodide;
    } catch (error) {
      pyodideLoading = null;
      throw error;
    }
  })();

  return pyodideLoading;
};

// Run Python code in browser (offline!)
export const runPythonOffline = async (code) => {
  try {
    const pyodide = await loadPyodideIfNeeded();
    
    // Redirect Python output
    await pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
    `);

    // Run user code
    await pyodide.runPythonAsync(code);

    // Get output
    const stdout = await pyodide.runPythonAsync('sys.stdout.getvalue()');
    const stderr = await pyodide.runPythonAsync('sys.stderr.getvalue()');

    const output = stdout || stderr || 'Code executed successfully!';

    return {
      status: 'success',
      output: output,
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
    const logs = [];
    
    console.log = (...args) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      logs.push(message);
    };

    // Run code in try-catch
    try {
      eval(code);
      output = logs.join('\n') || 'Code executed successfully!';
    } catch (err) {
      console.log = originalLog;
      return {
        status: 'error',
        error: err.message,
        execution_time: 0
      };
    }

    // Restore console.log
    console.log = originalLog;

    return {
      status: 'success',
      output: output,
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