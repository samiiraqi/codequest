import { useKingdom } from '../contexts/KingdomContext';

function KingdomStats() {
  const { coins, level, totalCoinsEarned, getKingdomStats, clearKingdom } = useKingdom();
  const stats = getKingdomStats();

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-white/50 mb-6">
      <h2 className="text-3xl font-black text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
        📊 Kingdom Stats
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Coins */}
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-4 border-2 border-yellow-300">
          <div className="text-3xl mb-2">💰</div>
          <div className="text-2xl font-black text-gray-800">{coins}</div>
          <div className="text-xs text-gray-600">Coins</div>
        </div>

        {/* Level */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 border-2 border-purple-300">
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-2xl font-black text-gray-800">Level {level}</div>
          <div className="text-xs text-gray-600">Kingdom Level</div>
        </div>

        {/* Population */}
        <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-4 border-2 border-blue-300">
          <div className="text-3xl mb-2">👥</div>
          <div className="text-2xl font-black text-gray-800">{stats.population}</div>
          <div className="text-xs text-gray-600">Citizens</div>
        </div>

        {/* Buildings */}
        <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4 border-2 border-green-300">
          <div className="text-3xl mb-2">🏗️</div>
          <div className="text-2xl font-black text-gray-800">{stats.buildingCount}</div>
          <div className="text-xs text-gray-600">Buildings</div>
        </div>
      </div>

      {/* Progress bars */}
      <div className="space-y-3 mb-6">
        {/* Happiness */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-bold text-gray-700">😊 Happiness</span>
            <span className="text-sm font-bold text-gray-700">{stats.happiness}%</span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-400 to-rose-500 transition-all duration-500"
              style={{ width: `${stats.happiness}%` }}
            />
          </div>
        </div>

        {/* Level Progress */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-bold text-gray-700">⭐ Level Progress</span>
            <span className="text-sm font-bold text-gray-700">
              {totalCoinsEarned % 500} / 500 coins
            </span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-500"
              style={{ width: `${((totalCoinsEarned % 500) / 500) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1">
            {500 - (totalCoinsEarned % 500)} more coins to level {level + 1}!
          </p>
        </div>
      </div>

      {/* Kingdom Value */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200 mb-4">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-700">💎 Kingdom Value:</span>
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {stats.kingdomValue} 💰
          </span>
        </div>
        <p className="text-xs text-gray-600 mt-1">
          Total coins invested in buildings
        </p>
      </div>

      {/* Total Coins Earned */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-200 mb-4">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-700">🎯 Total Coins Earned:</span>
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
            {totalCoinsEarned} 💰
          </span>
        </div>
        <p className="text-xs text-gray-600 mt-1">
          Lifetime earnings from coding!
        </p>
      </div>

      {/* Reset Button */}
      <button
        onClick={clearKingdom}
        className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
      >
        🔄 Reset Kingdom
      </button>
    </div>
  );
}

export default KingdomStats;