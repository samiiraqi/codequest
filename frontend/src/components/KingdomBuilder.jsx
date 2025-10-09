import { useState } from 'react';
import { useKingdom } from '../contexts/KingdomContext';
import { buildingTypes, getSizeMultiplier } from '../data/buildings';
import confetti from 'canvas-confetti';

function KingdomBuilder() {
  const { coins, level, spendCoins, addBuilding, removeBuilding, buildings } = useKingdom();
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [placementMode, setPlacementMode] = useState(false);

  const gridSize = 60;
  const canvasWidth = 12;
  const canvasHeight = 8;

  const availableBuildings = Object.values(buildingTypes).filter(
    building => building.unlockLevel <= level
  );

  const handleBuyBuilding = (buildingType) => {
    if (coins >= buildingType.cost) {
      setSelectedType(buildingType);
      setPlacementMode(true);
      setSelectedBuilding(null);
    } else {
      alert(`Not enough coins! You need ${buildingType.cost} coins but only have ${coins}.`);
    }
  };

  const handleCellClick = (x, y) => {
    // If in placement mode, place the building
    if (placementMode && selectedType) {
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
    } else {
      // Check if there's a building at this position to select
      const buildingAtPosition = buildings.find(
        b => b.x === x && b.y === y
      );

      if (buildingAtPosition) {
        setSelectedBuilding(buildingAtPosition);
      } else {
        setSelectedBuilding(null);
      }
    }
  };

  const handleRemoveBuilding = () => {
    if (selectedBuilding) {
      if (window.confirm(`Remove ${buildingTypes[selectedBuilding.type].name}? You won't get coins back.`)) {
        removeBuilding(selectedBuilding.id);
        setSelectedBuilding(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Kingdom Canvas */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-white/50">
        <h2 className="text-3xl font-black text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          🏰 Your Kingdom
        </h2>

        {placementMode && selectedType && (
          <div className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 border-2 border-blue-400 animate-pulse">
            <p className="font-bold text-gray-800 text-center text-lg">
              📍 Click anywhere on the map to place: {selectedType.emoji} {selectedType.name}
            </p>
            <button
              onClick={() => {
                setPlacementMode(false);
                setSelectedType(null);
              }}
              className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg font-bold hover:bg-red-600"
            >
              ✕ Cancel Placement
            </button>
          </div>
        )}

        {/* Canvas */}
        <div 
          className={`relative bg-gradient-to-br from-green-200 via-green-300 to-green-400 rounded-xl overflow-hidden shadow-inner border-4 border-green-500 ${
            placementMode ? 'cursor-crosshair ring-4 ring-blue-400' : 'cursor-pointer'
          }`}
          style={{ 
            width: `${canvasWidth * gridSize}px`, 
            height: `${canvasHeight * gridSize}px`,
            margin: '0 auto'
          }}
        >
          {/* Grid */}
          <div className="absolute inset-0">
            {Array.from({ length: canvasHeight }).map((_, row) => (
              <div key={row} className="flex">
                {Array.from({ length: canvasWidth }).map((_, col) => (
                  <div
                    key={col}
                    onClick={() => handleCellClick(col, row)}
                    className={`border border-green-400/30 transition-all ${
                      placementMode 
                        ? 'hover:bg-blue-400/40' 
                        : 'hover:bg-green-400/20'
                    }`}
                    style={{ 
                      width: `${gridSize}px`, 
                      height: `${gridSize}px` 
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Buildings */}
          {buildings.map((building) => {
            const buildingInfo = buildingTypes[building.type];
            const size = getSizeMultiplier(buildingInfo.size);
            
            return (
              <div
                key={building.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!placementMode) {
                    setSelectedBuilding(building);
                  }
                }}
                className={`absolute transition-all transform hover:scale-110 cursor-pointer ${
                  selectedBuilding?.id === building.id 
                    ? 'ring-4 ring-yellow-400 z-10 scale-110' 
                    : ''
                }`}
                style={{
                  left: `${building.x * gridSize}px`,
                  top: `${building.y * gridSize}px`,
                  width: `${gridSize * size}px`,
                  height: `${gridSize * size}px`,
                  fontSize: `${gridSize * size * 0.7}px`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'buildingAppear 0.5s ease-out',
                  pointerEvents: placementMode ? 'none' : 'auto'
                }}
                title={buildingInfo.name}
              >
                {buildingInfo.emoji}
              </div>
            );
          })}
        </div>

        {/* Selected Building Info */}
        {selectedBuilding && !placementMode && (
          <div className="mt-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 border-2 border-yellow-400">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {buildingTypes[selectedBuilding.type].emoji} {buildingTypes[selectedBuilding.type].name}
                </h3>
                <p className="text-sm text-gray-600">
                  {buildingTypes[selectedBuilding.type].description}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Position: ({selectedBuilding.x}, {selectedBuilding.y}) | Cost: {selectedBuilding.cost} 💰
                </p>
              </div>
              <button
                onClick={handleRemoveBuilding}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-all"
              >
                🗑️ Remove
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        {buildings.length === 0 && !placementMode && (
          <div className="mt-4 text-center text-gray-600">
            <p className="text-lg font-medium">Your kingdom is empty! 🏗️</p>
            <p className="text-sm">Buy buildings from the store below and click on the map to place them!</p>
          </div>
        )}

        <style jsx>{`
          @keyframes buildingAppear {
            from {
              opacity: 0;
              transform: scale(0) translateY(-20px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}</style>
      </div>

      {/* Building Store */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-white/50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            🏪 Building Store
          </h2>
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl font-black text-2xl shadow-lg">
            💰 {coins}
          </div>
        </div>

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
    </div>
  );
}

export default KingdomBuilder;