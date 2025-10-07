from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Literal
from ..services.code_executor_simple import simple_executor as executor

router = APIRouter()

class CodeExecutionRequest(BaseModel):
    """Request model for code execution"""
    code: str = Field(..., min_length=1, max_length=5000, description="Code to execute")
    language: Literal["python", "javascript", "html"] = Field(..., description="Programming language")
    
    class Config:
        json_schema_extra = {
            "example": {
                "code": "print('Hello, CodeQuest!')",
                "language": "python"
            }
        }

class CodeExecutionResponse(BaseModel):
    """Response model for code execution"""
    status: str
    output: str
    error: str
    execution_time: float
    language: str

@router.post("/execute", response_model=CodeExecutionResponse)
async def execute_code(request: CodeExecutionRequest):
    """
    Execute code in a secure, isolated environment
    
    - **code**: The code to execute
    - **language**: Programming language (python or javascript)
    """
    
    # Validate code length
    if len(request.code) > 5000:
        raise HTTPException(status_code=400, detail="Code is too long (max 5000 characters)")
    
    if not request.code.strip():
        raise HTTPException(status_code=400, detail="Code cannot be empty")
    
   # Execute based on language
    try:
        if request.language == "python":
            result = executor.execute_python(request.code)
        elif request.language == "javascript":
            result = executor.execute_javascript(request.code)
        elif request.language == "html":
            result = executor.execute_html(request.code)
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported language: {request.language}")
        
        # Add language to response
        result["language"] = request.language
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Execution error: {str(e)}")

@router.get("/languages")
async def get_supported_languages():
    """Get list of supported programming languages"""
    return {
        "languages": [
            {
                "id": "python",
                "name": "Python",
                "version": "3.11",
                "icon": "🐍"
            },
            {
                "id": "javascript",
                "name": "JavaScript",
                "version": "Node 20",
                "icon": "🟨"
            }
        ]
    }