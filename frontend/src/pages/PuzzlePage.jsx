import { useState } from 'react';
import PuzzleStats from '../components/PuzzleStats';
import PuzzleCanvas from '../components/PuzzleCanvas';
import PuzzleGallery from '../components/PuzzleGallery';
import { usePuzzle } from '../contexts/PuzzleContext';

function PuzzlePage({ onBack }) {
  const { activePuzzle, completedPuzzles } = usePuzzle();
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <button
            onClick={onBack}
            className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            ← Back to Coding
          </button>
          
          <h1 className="text-4xl md:text-6xl font-black text-white text-center flex-1">
            🧩 Puzzle Photo Builder
          </h1>

          <button
            onClick={() => setShowHelp(true)}
            className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            ❓ Help
          </button>
        </div>

        {/* Help Modal */}
        {showHelp && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  🎮 How to Play
                </h2>
                <button
                  onClick={() => setShowHelp(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-gray-700">
                <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                  <h3 className="font-bold text-lg mb-2">💰 Earn Coins by Coding</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Run code successfully: <strong>+10 coins</strong></li>
                    <li>Complete an exercise: <strong>+50 coins</strong></li>
                    <li>Solve a challenge: <strong>+100 coins</strong></li>
                    <li>Complete a puzzle: <strong>+500 bonus coins!</strong></li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                  <h3 className="font-bold text-lg mb-2">🧩 Build Your Puzzle</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Choose a beautiful photo from the gallery</li>
                    <li>The photo splits into 96 puzzle pieces</li>
                    <li>Click any locked piece to reveal it with coins</li>
                    <li>Each piece shows part of the image</li>
                    <li>Complete all pieces to see the full photo!</li>
                  </ol>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                  <h3 className="font-bold text-lg mb-2">💎 Puzzle Difficulties</h3>
                  <ul className="space-y-1 text-sm">
                    <li><span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span><strong>Easy</strong> (Sweets): 10 coins/piece = 960 total</li>
                    <li><span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2"></span><strong>Medium</strong> (Nature/Animals): 15 coins/piece = 1,440 total</li>
                    <li><span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span><strong>Hard</strong> (Palace/Jewelry): 20 coins/piece = 1,920 total</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
                  <h3 className="font-bold text-lg mb-2">🎯 Pro Tips</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Start with easy puzzles (sweets/candy)</li>
                    <li>Each completed puzzle gives 500 bonus coins</li>
                    <li>Work on one puzzle at a time</li>
                    <li>The more you code, the more puzzles you unlock!</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setShowHelp(false)}
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
              >
                Got it! Let's Build! 🧩
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats */}
          <div className="lg:col-span-1">
            <PuzzleStats />
          </div>

          {/* Right Column - Canvas & Gallery */}
          <div className="lg:col-span-2 space-y-6">
            {/* Puzzle Canvas */}
            {activePuzzle ? (
              <PuzzleCanvas />
            ) : (
              <div className="bg-white rounded-2xl shadow-2xl p-12 border-4 border-white/50 text-center">
                <div className="text-6xl mb-4">🧩</div>
                <h2 className="text-3xl font-black text-gray-800 mb-3">
                  Choose Your First Puzzle!
                </h2>
                <p className="text-gray-600 mb-6">
                  Select a beautiful photo from the gallery below to start building
                </p>
                <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 border-2 border-purple-300">
                  <p className="text-gray-700 text-sm">
                    👇 Scroll down to see all available puzzles
                  </p>
                </div>
              </div>
            )}

            {/* Puzzle Gallery */}
            <PuzzleGallery />
          </div>
        </div>

        {/* Welcome Message for New Users */}
        {completedPuzzles.length === 0 && !activePuzzle && (
          <div className="fixed bottom-8 left-64 bg-white rounded-2xl shadow-2xl p-6 max-w-sm z-50">
            <button
              onClick={(e) => e.currentTarget.parentElement.style.display = 'none'}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ✕
            </button>
            <h3 className="text-2xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3">
              👋 Welcome!
            </h3>
            <p className="text-gray-700 text-center mb-4 text-sm">
              Choose a beautiful photo and start revealing puzzle pieces!
            </p>
            <button
              onClick={() => setShowHelp(true)}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-bold text-sm"
            >
              📚 How to Play
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PuzzlePage;