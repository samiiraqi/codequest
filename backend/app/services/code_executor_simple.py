import sys
import io
import time
from typing import Dict, Any
from contextlib import redirect_stdout, redirect_stderr

class SimpleCodeExecutor:
    """
    Simple code execution without Docker (for testing/demo)
    Uses Python's exec with limited scope
    """
    
    def __init__(self):
        self.timeout = 5  # 5 seconds
        
    def execute_python(self, code: str) -> Dict[str, Any]:
        """
        Execute Python code safely
        """
        try:
            # Validate code
            if self._is_dangerous_code(code):
                return {
                    "status": "error",
                    "error": "Code contains restricted operations",
                    "output": "",
                    "execution_time": 0
                }
            
            # Capture output
            stdout_buffer = io.StringIO()
            stderr_buffer = io.StringIO()
            
            # Start timer
            start_time = time.time()
            
            # Create restricted namespace (no dangerous functions)
            safe_namespace = {
                '__builtins__': {
                    'print': print,
                    'len': len,
                    'range': range,
                    'str': str,
                    'int': int,
                    'float': float,
                    'list': list,
                    'dict': dict,
                    'tuple': tuple,
                    'set': set,
                    'abs': abs,
                    'max': max,
                    'min': min,
                    'sum': sum,
                    'round': round,
                    'sorted': sorted,
                    'enumerate': enumerate,
                    'zip': zip,
                }
            }
            
            # Execute code with output capture
            with redirect_stdout(stdout_buffer), redirect_stderr(stderr_buffer):
                exec(code, safe_namespace)
            
            execution_time = round(time.time() - start_time, 3)
            
            # Get output
            output = stdout_buffer.getvalue()
            error = stderr_buffer.getvalue()
            
            if error:
                return {
                    "status": "error",
                    "output": output,
                    "error": error,
                    "execution_time": execution_time
                }
            
            return {
                "status": "success",
                "output": output,
                "error": "",
                "execution_time": execution_time
            }
            
        except SyntaxError as e:
            return {
                "status": "error",
                "output": "",
                "error": f"Syntax Error: {str(e)}",
                "execution_time": 0
            }
            
        except Exception as e:
            return {
                "status": "error",
                "output": "",
                "error": f"Error: {str(e)}",
                "execution_time": 0
            }
    
    def execute_javascript(self, code: str) -> Dict[str, Any]:
        """
        Execute JavaScript code using Node.js
        Note: This is a simple implementation. For production, use Docker.
        """
        import subprocess
        import tempfile
        import os
        
        try:
            # Validate code
            if self._is_dangerous_code_js(code):
                return {
                    "status": "error",
                    "error": "Code contains restricted operations",
                    "output": "",
                    "execution_time": 0
                }
            
            # Start timer
            start_time = time.time()
            
            # Create temporary file
            with tempfile.NamedTemporaryFile(mode='w', suffix='.js', delete=False) as f:
                f.write(code)
                temp_file = f.name
            
            try:
                # Execute JavaScript with Node.js
                result = subprocess.run(
                    ['node', temp_file],
                    capture_output=True,
                    text=True,
                    timeout=self.timeout
                )
                
                execution_time = round(time.time() - start_time, 3)
                
                if result.returncode == 0:
                    return {
                        "status": "success",
                        "output": result.stdout,
                        "error": "",
                        "execution_time": execution_time
                    }
                else:
                    return {
                        "status": "error",
                        "output": result.stdout,
                        "error": result.stderr,
                        "execution_time": execution_time
                    }
                    
            finally:
                # Clean up temp file
                if os.path.exists(temp_file):
                    os.remove(temp_file)
                    
        except subprocess.TimeoutExpired:
            return {
                "status": "error",
                "output": "",
                "error": "Execution timeout (max 5 seconds)",
                "execution_time": self.timeout
            }
        except FileNotFoundError:
            return {
                "status": "error",
                "output": "",
                "error": "Node.js is not installed. Please install Node.js to run JavaScript code.",
                "execution_time": 0
            }
        except Exception as e:
            return {
                "status": "error",
                "output": "",
                "error": f"Error: {str(e)}",
                "execution_time": 0
            }
    def execute_html(self, code: str) -> Dict[str, Any]:
        """
        Return HTML code (for preview in frontend)
        """
        try:
            start_time = time.time()
            execution_time = round(time.time() - start_time, 3)
            
            return {
                "status": "success",
                "output": code,  # Return HTML as-is
                "error": "",
                "execution_time": execution_time
            }
        except Exception as e:
            return {
                "status": "error",
                "output": "",
                "error": f"Error: {str(e)}",
                "execution_time": 0
            }
    
    def _is_dangerous_code_js(self, code: str) -> bool:
        """
        Check for dangerous JavaScript operations
        """
        dangerous_keywords = [
            'require(',
            'import ',
            'fs.',
            'child_process',
            'process.exit',
            'eval(',
            '__dirname',
            '__filename',
        ]
        
        code_lower = code.lower()
        for keyword in dangerous_keywords:
            if keyword.lower() in code_lower:
                return True
        return False
    
    def _is_dangerous_code(self, code: str) -> bool:
        """
        Check for dangerous operations
        """
        dangerous_keywords = [
            'import os',
            'import sys',
            'import subprocess',
            '__import__',
            'eval',
            'exec',
            'compile',
            'open',
            'file',
            'input',
            'raw_input',
            '__builtins__',
        ]
        
        code_lower = code.lower()
        for keyword in dangerous_keywords:
            if keyword.lower() in code_lower:
                return True
        return False

# Create global instance
simple_executor = SimpleCodeExecutor()