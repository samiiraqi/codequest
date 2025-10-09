import { useState, useRef } from 'react';
import { useKingdom } from '../contexts/KingdomContext';
import { buildingTypes, getSizeMultiplier } from '../data/buildings';

function KingdomCanvas() {
  const { buildings, removeBuilding } = useKingdom();
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const canvasRef = useRef(null);

  const gridSize = 60; // Size of each grid cell
  const canvasWidth = 12; // 12 cells wide
  const canvasHeight = 8; // 8 cells tall

  const handleCellClick = (x, y) => {
    // Check if there's a building at this position
    const buildingAtPosition = buildings.find(
      b => b.x === x && b.y === y
    );

    if (buildingAtPosition) {
      setSelectedBuilding(buildingAtPosition);
    } else {
      setSelectedBuilding(null);
    }
  };

  const handleRemoveBuilding = () => {
    if (selectedBuilding) {
      if (window.confirm(`Remove ${buildingTypes[selectedBuilding.type].name}?`)) {
        removeBuilding(selectedBuilding.id);
        setSelectedBuilding(null);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-white/50">
      <h2 className="text-3xl font-black text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
        🏰 Your Kingdom
      </h2>

      {/* Canvas */}
      <div 
        ref={canvasRef}
        className="relative bg-gradient-to-br from-green-200 via-green-300 to-green-400 rounded-xl overflow-hidden shadow-inner border-4 border-green-500"
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
                  className="border border-green-400/30 hover:bg-green-400/20 transition-all cursor-pointer"
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
              onClick={() => setSelectedBuilding(building)}
              className={`absolute transition-all transform hover:scale-110 cursor-pointer ${
                selectedBuilding?.id === building.id 
                  ? 'ring-4 ring-yellow-400 z-10' 
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
                animation: 'buildingAppear 0.5s ease-out'
              }}
              title={buildingInfo.name}
            >
              {buildingInfo.emoji}
            </div>
          );
        })}
      </div>

      {/* Selected Building Info */}
      {selectedBuilding && (
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
                Position: ({selectedBuilding.x}, {selectedBuilding.y})
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
      {buildings.length === 0 && (
        <div className="mt-4 text-center text-gray-600">
          <p className="text-lg font-medium">Your kingdom is empty! 🏗️</p>
          <p className="text-sm">Buy buildings from the store below and place them on the map!</p>
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
  );
}

export default KingdomCanvas;