import { useState, useEffect } from 'react';
import { usePuzzle } from '../contexts/PuzzleContext';
import { puzzlePhotos, puzzleConfig } from '../data/puzzlePhotos';
import confetti from 'canvas-confetti';

function PuzzleCanvas() {
  const { 
    coins, 
    activePuzzle, 
    unlockedPieces, 
    spendCoins, 
    unlockPiece 
  } = usePuzzle();

  const [selectedPiece, setSelectedPiece] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentPuzzle = puzzlePhotos.find(p => p.id === activePuzzle);
  
  if (!currentPuzzle) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-white/50 text-center">
        <h2 className="text-3xl font-black text-gray-800 mb-4">
          🧩 No Puzzle Selected
        </h2>
        <p className="text-gray-600">
          Choose a puzzle from the gallery below to start building!
        </p>
      </div>
    );
  }

  const { gridWidth, gridHeight, pieceSize } = puzzleConfig;
  const totalPieces = gridWidth * gridHeight;
  const completionPercentage = Math.round((unlockedPieces.length / totalPieces) * 100);

  const handlePieceClick = (pieceIndex) => {
    // Check if already unlocked
    if (unlockedPieces.includes(pieceIndex)) {
      setSelectedPiece(pieceIndex);
      return;
    }

    // Try to unlock
    if (coins >= currentPuzzle.costPerPiece) {
      if (spendCoins(currentPuzzle.costPerPiece)) {
        unlockPiece(pieceIndex);
        
        // Small celebration
        confetti({
          particleCount: 30,
          spread: 40,
          origin: { y: 0.6 }
        });

        // Check if puzzle complete
        if (unlockedPieces.length + 1 === totalPieces) {
          setTimeout(() => {
            confetti({
              particleCount: 200,
              spread: 100,
              origin: { y: 0.5 }
            });
            alert('🎉 PUZZLE COMPLETE! You earned 500 bonus coins!');
          }, 500);
        }
      }
    } else {
      alert(`Not enough coins! You need ${currentPuzzle.costPerPiece} coins but only have ${coins}.`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-white/50">
      {/* Header */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            {currentPuzzle.emoji} {currentPuzzle.name}
          </h2>
          <div className="text-right">
            <div className="text-sm text-gray-600">Progress</div>
            <div className="text-2xl font-black text-purple-600">
              {unlockedPieces.length}/{totalPieces}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="h-6 bg-gray-200 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
              {completionPercentage}% Complete
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-2">
          {currentPuzzle.description} • {currentPuzzle.costPerPiece} 💰 per piece
        </p>
      </div>

      {/* Puzzle Grid */}
      <div 
        className="relative bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden shadow-inner border-4 border-gray-400 mx-auto"
        style={{ 
          width: `${gridWidth * pieceSize}px`, 
          height: `${gridHeight * pieceSize}px`
        }}
      >
        {/* Background Image (hidden, used for clipping) */}
        <img
          src={currentPuzzle.imageUrl}
          alt={currentPuzzle.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: 'none' }}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Puzzle Pieces */}
        <div className="absolute inset-0">
          {Array.from({ length: gridHeight }).map((_, row) => (
            <div key={row} className="flex">
              {Array.from({ length: gridWidth }).map((_, col) => {
                const pieceIndex = row * gridWidth + col;
                const isUnlocked = unlockedPieces.includes(pieceIndex);
                const isSelected = selectedPiece === pieceIndex;

                return (
                  <div
                    key={pieceIndex}
                    onClick={() => handlePieceClick(pieceIndex)}
                    className={`relative border border-gray-400/50 transition-all cursor-pointer ${
                      isSelected ? 'ring-4 ring-yellow-400 z-10' : ''
                    } ${
                      isUnlocked ? 'hover:brightness-110' : 'hover:bg-blue-300/30'
                    }`}
                    style={{ 
                      width: `${pieceSize}px`, 
                      height: `${pieceSize}px`,
                      backgroundImage: isUnlocked ? `url(${currentPuzzle.imageUrl})` : 'none',
                      backgroundSize: `${gridWidth * pieceSize}px ${gridHeight * pieceSize}px`,
                      backgroundPosition: `-${col * pieceSize}px -${row * pieceSize}px`,
                      animation: isUnlocked ? 'pieceReveal 0.5s ease-out' : 'none'
                    }}
                  >
                    {/* Locked Overlay */}
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl mb-1">🔒</div>
                          <div className="text-xs font-bold text-white">
                            {currentPuzzle.costPerPiece}💰
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Piece Number (for unlocked pieces) */}
                    {isUnlocked && (
                      <div className="absolute top-0 left-0 bg-black/20 text-white text-xs px-1 rounded-br">
                        {pieceIndex + 1}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Completion Overlay */}
        {unlockedPieces.length === totalPieces && (
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 flex items-center justify-center animate-pulse">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-6xl mb-2">🎉</div>
              <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                COMPLETED!
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      {unlockedPieces.length === 0 && (
        <div className="mt-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 border-2 border-blue-300">
          <p className="text-center text-gray-700">
            💡 <strong>Click any locked piece</strong> to reveal it with coins!
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes pieceReveal {
          from {
            opacity: 0;
            transform: scale(0.8) rotateY(90deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
          }
        }
      `}</style>
    </div>
  );
}

export default PuzzleCanvas;