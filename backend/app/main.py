from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from pathlib import Path
from dotenv import load_dotenv
from app.api import execution

# Load environment variables
env_path = Path(__file__).parent.parent / '.env'
load_dotenv(env_path)

app = FastAPI(
    title="CodeQuest API",
    description="Backend API for CodeQuest - Kids Coding Learning Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for now (we'll fix later)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "🚀 Welcome to CodeQuest API!",
        "status": "running",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "message": "API is running smoothly!"
    }

@app.get("/api/languages")
async def get_languages():
    """Get available languages for the platform"""
    return {
        "languages": [
            {
                "code": "en",
                "name": "English",
                "nativeName": "English",
                "flag": "🇬🇧",
                "dir": "ltr"
            },
            {
                "code": "he",
                "name": "Hebrew",
                "nativeName": "עברית",
                "flag": "🇮🇱",
                "dir": "rtl"
            },
            {
                "code": "ar",
                "name": "Arabic",
                "nativeName": "العربية",
                "flag": "🇸🇦",
                "dir": "rtl"
            }
        ]
    }

@app.get("/api/exercises")
async def get_exercises():
    """Get list of available exercises"""
    return {
        "exercises": [
            {
                "id": "ex001",
                "title": {
                    "en": "Hello World",
                    "he": "שלום עולם",
                    "ar": "مرحبا بالعالم"
                },
                "description": {
                    "en": "Learn to print your first message!",
                    "he": "!למד להדפיס את ההודעה הראשונה שלך",
                    "ar": "!تعلم طباعة رسالتك الأولى"
                },
                "difficulty": 1,
                "language": "python",
                "type": "beginner"
            }
        ]
    }
# Include routers
app.include_router(execution.router, prefix="/api", tags=["Code Execution"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )