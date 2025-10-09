import { usePuzzle } from '../contexts/PuzzleContext';
import { puzzlePhotos } from '../data/puzzlePhotos';

function PuzzleGallery() {
  const { activePuzzle, selectPuzzle, completedPuzzles, coins } = usePuzzle();

  const categories = [...new Set(puzzlePhotos.map(p => p.category))];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'from-green-400 to-emerald-500';
      case 'medium': return 'from-yellow-400 to-orange-500';
      case 'hard': return 'from-red-500 to-pink-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-white/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          🖼️ Puzzle Gallery
        </h2>
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl font-black text-2xl shadow-lg">
          💰 {coins}
        </div>
      </div>

      {/* Categories */}
      {categories.map((category) => {
        const categoryPuzzles = puzzlePhotos.filter(p => p.category === category);
        
        return (
          <div key={category} className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {category === 'Sweets' && '🍬'}
              {category === 'Palace' && '🏰'}
              {category === 'Jewelry' && '💎'}
              {category === 'Nature' && '🌿'}
              {category === 'Animals' && '🦋'}
              {' '}{category}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryPuzzles.map((puzzle) => {
                const isActive = activePuzzle === puzzle.id;
                const isCompleted = completedPuzzles.includes(puzzle.id);
                const totalCost = puzzle.costPerPiece * 96;

                return (
                  <div
                    key={puzzle.id}
                    onClick={() => !isActive && selectPuzzle(puzzle.id)}
                    className={`relative rounded-xl overflow-hidden cursor-pointer transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl ${
                      isActive ? 'ring-4 ring-purple-500' : ''
                    }`}
                  >
                    {/* Image */}
                    <div className="relative h-48">
                      <img
                        src={puzzle.imageUrl}
                        alt={puzzle.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                      {/* Status Badge */}
                      {isCompleted && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          ✓ Completed
                        </div>
                      )}

                      {isActive && (
                        <div className="absolute top-2 right-2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                          ▶ Active
                        </div>
                      )}

                      {/* Difficulty Badge */}
                      <div className={`absolute top-2 left-2 bg-gradient-to-r ${getDifficultyColor(puzzle.difficulty)} text-white px-3 py-1 rounded-full text-xs font-bold capitalize`}>
                        {puzzle.difficulty}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="bg-white p-4">
                      <h4 className="font-bold text-lg text-gray-800 mb-1">
                        {puzzle.emoji} {puzzle.name}
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">
                        {puzzle.description}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <span className="font-bold text-gray-700">96 pieces</span>
                          <span className="text-gray-500"> • </span>
                          <span className="font-bold text-orange-600">{puzzle.costPerPiece}💰/piece</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Total: {totalCost}💰
                        </div>
                      </div>

                      {isActive ? (
                        <div className="mt-3 bg-purple-100 text-purple-700 text-center py-2 rounded-lg font-bold text-sm">
                          Currently Working On This
                        </div>
                      ) : isCompleted ? (
                        <button
                          className="mt-3 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg font-bold text-sm"
                        >
                          ✓ View Completed
                        </button>
                      ) : (
                        <button
                          className="mt-3 w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-2 rounded-lg font-bold text-sm hover:shadow-lg transition-all"
                        >
                          Start This Puzzle
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Info Box */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200">
        <h4 className="font-bold text-gray-800 mb-2">💡 How It Works:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Choose a puzzle photo</li>
          <li>• Click locked pieces to reveal them with coins</li>
          <li>• Each piece shows part of the beautiful image</li>
          <li>• Complete the puzzle to see the full photo!</li>
          <li>• Earn <strong>500 bonus coins</strong> when you complete a puzzle!</li>
        </ul>
      </div>
    </div>
  );
}

export default PuzzleGallery;