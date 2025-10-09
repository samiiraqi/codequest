import { useState } from 'react';
import KingdomStats from '../components/KingdomStats';
//import KingdomCanvas from '../components/KingdomCanvas';
//import BuildingStore from '../components/BuildingStore';
import KingdomBuilder from '../components/KingdomBuilder';
import { useKingdom } from '../contexts/KingdomContext';

function KingdomPage({ onBack }) {
  const { buildings } = useKingdom();
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            ← Back to Coding
          </button>
          
          <h1 className="text-4xl md:text-6xl font-black text-white text-center flex-1">
            🏰 Code Kingdom Builder
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
                  <h3 className="font-bold text-lg mb-2">💰 Earn Coins</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Run code successfully: <strong>+10 coins</strong></li>
                    <li>Complete an exercise: <strong>+50 coins</strong></li>
                    <li>Solve a challenge: <strong>+100 coins</strong></li>
                    <li>Unlock an achievement: <strong>+200 coins</strong></li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                  <h3 className="font-bold text-lg mb-2">🏗️ Build Your Kingdom</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Buy buildings from the store</li>
                    <li>Click on the map to place them</li>
                    <li>Build houses to increase population</li>
                    <li>Add decorations to increase happiness</li>
                  </ol>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                  <h3 className="font-bold text-lg mb-2">⭐ Level Up</h3>
                  <p className="text-sm">
                    Earn <strong>500 coins</strong> to level up! Higher levels unlock more buildings.
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
                  <h3 className="font-bold text-lg mb-2">🎯 Tips</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Start with cheap buildings like trees and flowers</li>
                    <li>Houses increase population (5 citizens per house)</li>
                    <li>Save up for the castle! It's the ultimate goal!</li>
                    <li>Click on buildings to remove them and get space</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setShowHelp(false)}
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
              >
                Got it! Let's Build! 🏗️
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats */}
          <div className="lg:col-span-1">
            <KingdomStats />
          </div>

          {/* Right Column - Kingdom & Store */}
          <div className="lg:col-span-2 space-y-6">
            <KingdomBuilder />
          </div>
        </div>

        {/* Welcome Message for New Users */}
        {buildings.length === 0 && (
          <div className="fixed bottom-8 left-16 transform -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 max-w-sm z-50">
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
              Start building by buying your first building from the store!
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

export default KingdomPage;