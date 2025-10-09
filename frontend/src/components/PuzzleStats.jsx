import { usePuzzle } from '../contexts/PuzzleContext';

function PuzzleStats() {
  const { coins, totalCoinsEarned, completedPuzzles, unlockedPieces, activePuzzle } = usePuzzle();

  const stats = {
    totalCoins: coins,
    totalEarned: totalCoinsEarned,
    completed: completedPuzzles.length,
    activeProgress: activePuzzle ? unlockedPieces.length : 0,
    activeTotal: 96
  };

  const activePercentage = activePuzzle 
    ? Math.round((stats.activeProgress / stats.activeTotal) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-white/50 mb-6">
      <h2 className="text-3xl font-black text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
        📊 Your Stats
      </h2>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Coins */}
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-4 border-2 border-yellow-300">
          <div className="text-3xl mb-2">💰</div>
          <div className="text-2xl font-black text-gray-800">{coins}</div>
          <div className="text-xs text-gray-600">Current Coins</div>
        </div>

        {/* Completed */}
        <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4 border-2 border-green-300">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-2xl font-black text-gray-800">{stats.completed}</div>
          <div className="text-xs text-gray-600">Puzzles Completed</div>
        </div>
      </div>

      {/* Active Puzzle Progress */}
      {activePuzzle && (
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-bold text-gray-700">🧩 Active Puzzle</span>
            <span className="text-sm font-bold text-gray-700">
              {stats.activeProgress}/{stats.activeTotal} pieces
            </span>
          </div>
          <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 transition-all duration-500"
              style={{ width: `${activePercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1 text-center">
            {activePercentage}% complete
          </p>
        </div>
      )}

      {/* Total Earnings */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200 mb-4">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-700">🎯 Total Earned:</span>
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {totalCoinsEarned} 💰
          </span>
        </div>
        <p className="text-xs text-gray-600 mt-1">
          Lifetime coins from coding!
        </p>
      </div>

      {/* How to Earn */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
        <h4 className="font-bold text-gray-800 mb-2">💡 Earn More Coins:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Run code: <strong>+10 coins</strong></li>
          <li>• Complete exercise: <strong>+50 coins</strong></li>
          <li>• Solve challenge: <strong>+100 coins</strong></li>
          <li>• Complete puzzle: <strong>+500 coins</strong></li>
        </ul>
      </div>
    </div>
  );
}

export default PuzzleStats;