import { useState } from 'react';
import { useKingdom } from '../contexts/KingdomContext';
import { buildingTypes } from '../data/buildings';
import confetti from 'canvas-confetti';

function BuildingStore() {
  const { coins, level, spendCoins, addBuilding, buildings } = useKingdom();
  const [selectedType, setSelectedType] = useState(null);
  const [placementMode, setPlacementMode] = useState(false);

  const availableBuildings = Object.values(buildingTypes).filter(
    building => building.unlockLevel <= level
  );

  const handleBuyBuilding = (buildingType) => {
    if (coins >= buildingType.cost) {
      setSelectedType(buildingType);
      setPlacementMode(true);
    } else {
      alert(`Not enough coins! You need ${buildingType.cost} coins but only have ${coins}.`);
    }
  };

  const handlePlaceBuilding = (x, y) => {
    if (!selectedType || !placementMode) return;

    // Check if position is occupied
    const isOccupied = buildings.some(b => b.x === x && b.y === y);
    if (isOccupied) {
      alert('This spot is already occupied!');
      return;
    }

    // Spend coins and add building
    if (spendCoins(selectedType.cost)) {
      const newBuilding = {
        id: Date.now(),
        type: selectedType.id,
        x,
        y,
        cost: selectedType.cost,
        placedAt: new Date().toISOString()
      };
      
      addBuilding(newBuilding);
      
      // Celebration!
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });

      setPlacementMode(false);
      setSelectedType(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-white/50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          🏪 Building Store
        </h2>
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl font-black text-2xl shadow-lg">
          💰 {coins}
        </div>
      </div>

      {placementMode && selectedType && (
        <div className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 border-2 border-blue-400">
          <p className="font-bold text-gray-800 text-center">
            📍 Click on the kingdom map above to place: {selectedType.emoji} {selectedType.name}
          </p>
          <button
            onClick={() => {
              setPlacementMode(false);
              setSelectedType(null);
            }}
            className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg font-bold hover:bg-red-600"
          >
            ✕ Cancel
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {availableBuildings.map((building) => {
          const canAfford = coins >= building.cost;
          
          return (
            <div
              key={building.id}
              className={`rounded-xl p-4 border-2 transition-all transform hover:scale-105 ${
                canAfford
                  ? 'bg-gradient-to-br from-white to-gray-50 border-green-300 hover:border-green-500 cursor-pointer shadow-md hover:shadow-xl'
                  : 'bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed'
              }`}
              onClick={() => canAfford && handleBuyBuilding(building)}
            >
              <div className="text-center">
                <div className="text-5xl mb-2">{building.emoji}</div>
                <h3 className="font-bold text-gray-800 text-sm mb-1">
                  {building.name}
                </h3>
                <p className="text-xs text-gray-600 mb-2 h-8">
                  {building.description}
                </p>
                <div className={`font-black text-lg ${canAfford ? 'text-green-600' : 'text-red-600'}`}>
                  💰 {building.cost}
                </div>
                {!canAfford && (
                  <div className="text-xs text-red-600 font-medium mt-1">
                    Need {building.cost - coins} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Locked buildings hint */}
      {level < 7 && (
        <div className="mt-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 border-2 border-purple-300">
          <p className="text-center text-gray-700">
            <span className="font-bold">🔒 Level {level + 1}</span> - Unlock more buildings by earning coins through coding!
          </p>
        </div>
      )}
    </div>
  );
}

export default BuildingStore;