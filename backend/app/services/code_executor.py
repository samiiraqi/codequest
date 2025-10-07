import docker
import uuid
import time
from typing import Dict, Any
import os

class CodeExecutor:
    """
    Secure code execution service using Docker containers
    """
    
    def __init__(self):
        self.client = docker.from_env()
        self.timeout = int(os.getenv('MAX_EXECUTION_TIME', 5))  # 5 seconds
        self.memory_limit = os.getenv('MAX_MEMORY_MB', '256m')  # 256MB
        
    def execute_python(self, code: str) -> Dict[str, Any]:
        """
        Execute Python code in isolated Docker container
        
        Args:
            code: Python code string to execute
            
        Returns:
            Dict with output, error, status, and execution_time
        """
        try:
            # Generate unique container name
            container_name = f"codequest-{uuid.uuid4().hex[:8]}"
            
            # Security: Validate code (basic check)
            if self._is_dangerous_code(code):
                return {
                    "status": "error",
                    "error": "Code contains potentially dangerous operations",
                    "output": "",
                    "execution_time": 0
                }
            
            # Start timer
            start_time = time.time()
            
            # Run code in Docker container
            container = self.client.containers.run(
                image="python:3.11-alpine",  # Lightweight Python image
                command=["python", "-c", code],
                name=container_name,
                detach=False,
                remove=True,  # Auto-remove after execution
                network_disabled=True,  # No network access (security!)
                mem_limit=self.memory_limit,  # Memory limit
                cpu_period=100000,  # CPU limit
                cpu_quota=50000,  # 50% CPU
                timeout=self.timeout,  # Execution timeout
                stdout=True,
                stderr=True
            )
            
            # Calculate execution time
            execution_time = round(time.time() - start_time, 3)
            
            # Decode output
            output = container.decode('utf-8').strip()
            
            return {
                "status": "success",
                "output": output,
                "error": "",
                "execution_time": execution_time
            }
            
        except docker.errors.ContainerError as e:
            # Code execution error (e.g., syntax error)
            execution_time = round(time.time() - start_time, 3)
            return {
                "status": "error",
                "output": "",
                "error": e.stderr.decode('utf-8').strip(),
                "execution_time": execution_time
            }
            
        except Exception as e:
            # Other errors (timeout, etc.)
            execution_time = round(time.time() - start_time, 3) if 'start_time' in locals() else 0
            return {
                "status": "error",
                "output": "",
                "error": str(e),
                "execution_time": execution_time
            }
    
    def execute_javascript(self, code: str) -> Dict[str, Any]:
        """
        Execute JavaScript code in isolated Docker container
        """
        try:
            container_name = f"codequest-js-{uuid.uuid4().hex[:8]}"
            
            if self._is_dangerous_code(code):
                return {
                    "status": "error",
                    "error": "Code contains potentially dangerous operations",
                    "output": "",
                    "execution_time": 0
                }
            
            start_time = time.time()
            
            # Run JavaScript code with Node.js
            container = self.client.containers.run(
                image="node:20-alpine",
                command=["node", "-e", code],
                name=container_name,
                detach=False,
                remove=True,
                network_disabled=True,
                mem_limit=self.memory_limit,
                cpu_period=100000,
                cpu_quota=50000,
                timeout=self.timeout,
                stdout=True,
                stderr=True
            )
            
            execution_time = round(time.time() - start_time, 3)
            output = container.decode('utf-8').strip()
            
            return {
                "status": "success",
                "output": output,
                "error": "",
                "execution_time": execution_time
            }
            
        except docker.errors.ContainerError as e:
            execution_time = round(time.time() - start_time, 3)
            return {
                "status": "error",
                "output": "",
                "error": e.stderr.decode('utf-8').strip(),
                "execution_time": execution_time
            }
            
        except Exception as e:
            execution_time = round(time.time() - start_time, 3) if 'start_time' in locals() else 0
            return {
                "status": "error",
                "output": "",
                "error": str(e),
                "execution_time": execution_time
            }
    
    def _is_dangerous_code(self, code: str) -> bool:
        """
        Basic security check for dangerous operations
        """
        dangerous_keywords = [
            'import os',
            'import sys',
            'import subprocess',
            '__import__',
            'eval(',
            'exec(',
            'compile(',
            'open(',
            'file(',
            'input(',
            'raw_input(',
        ]
        
        code_lower = code.lower()
        for keyword in dangerous_keywords:
            if keyword.lower() in code_lower:
                return True
        return False

# Create global instance
executor = CodeExecutor()