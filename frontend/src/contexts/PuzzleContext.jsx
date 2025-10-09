import { createContext, useContext, useState, useEffect } from 'react';

const PuzzleContext = createContext();

export const usePuzzle = () => {
  const context = useContext(PuzzleContext);
  if (!context) {
    throw new Error('usePuzzle must be used within PuzzleProvider');
  }
  return context;
};

export const PuzzleProvider = ({ children }) => {
  const [coins, setCoins] = useState(() => {
    return parseInt(localStorage.getItem('codequest_puzzle_coins') || '200'); // Start with 200 coins
  });

  const [activePuzzle, setActivePuzzle] = useState(() => {
    const saved = localStorage.getItem('codequest_active_puzzle');
    return saved ? JSON.parse(saved) : null;
  });

  const [unlockedPieces, setUnlockedPieces] = useState(() => {
    const saved = localStorage.getItem('codequest_unlocked_pieces');
    return saved ? JSON.parse(saved) : [];
  });

  const [completedPuzzles, setCompletedPuzzles] = useState(() => {
    const saved = localStorage.getItem('codequest_completed_puzzles');
    return saved ? JSON.parse(saved) : [];
  });

  const [totalCoinsEarned, setTotalCoinsEarned] = useState(() => {
    return parseInt(localStorage.getItem('codequest_total_coins_earned') || '0');
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('codequest_puzzle_coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('codequest_active_puzzle', JSON.stringify(activePuzzle));
  }, [activePuzzle]);

  useEffect(() => {
    localStorage.setItem('codequest_unlocked_pieces', JSON.stringify(unlockedPieces));
  }, [unlockedPieces]);

  useEffect(() => {
    localStorage.setItem('codequest_completed_puzzles', JSON.stringify(completedPuzzles));
  }, [completedPuzzles]);

  useEffect(() => {
    localStorage.setItem('codequest_total_coins_earned', totalCoinsEarned.toString());
  }, [totalCoinsEarned]);

  // Award coins
  const awardCoins = (amount, reason) => {
    setCoins(prev => prev + amount);
    setTotalCoinsEarned(prev => prev + amount);
    return { coinsAdded: amount };
  };

  // Spend coins
  const spendCoins = (amount) => {
    if (coins >= amount) {
      setCoins(prev => prev - amount);
      return true;
    }
    return false;
  };

  // Select puzzle to work on
  const selectPuzzle = (puzzleId) => {
    setActivePuzzle(puzzleId);
    // Load unlocked pieces for this puzzle
    const saved = localStorage.getItem(`puzzle_${puzzleId}_pieces`);
    setUnlockedPieces(saved ? JSON.parse(saved) : []);
  };

  // Unlock a piece
  const unlockPiece = (pieceIndex) => {
    if (!unlockedPieces.includes(pieceIndex)) {
      const newUnlocked = [...unlockedPieces, pieceIndex];
      setUnlockedPieces(newUnlocked);
      localStorage.setItem(`puzzle_${activePuzzle}_pieces`, JSON.stringify(newUnlocked));
      
      // Check if puzzle is complete
      if (newUnlocked.length === 96) {
        completePuzzle();
      }
      
      return true;
    }
    return false;
  };

  // Complete puzzle
  const completePuzzle = () => {
    if (activePuzzle && !completedPuzzles.includes(activePuzzle)) {
      const newCompleted = [...completedPuzzles, activePuzzle];
      setCompletedPuzzles(newCompleted);
      // Award bonus coins for completion
      awardCoins(500, 'puzzle_complete');
    }
  };

  // Reset puzzle
  const resetPuzzle = () => {
    if (activePuzzle) {
      localStorage.removeItem(`puzzle_${activePuzzle}_pieces`);
      setUnlockedPieces([]);
    }
  };

  // Get stats
  const getStats = () => {
    return {
      totalCoins: coins,
      totalCoinsEarned,
      activePuzzleProgress: activePuzzle ? unlockedPieces.length : 0,
      activePuzzleTotal: 96,
      completedCount: completedPuzzles.length
    };
  };

  return (
    <PuzzleContext.Provider value={{
      coins,
      activePuzzle,
      unlockedPieces,
      completedPuzzles,
      totalCoinsEarned,
      awardCoins,
      spendCoins,
      selectPuzzle,
      unlockPiece,
      resetPuzzle,
      completePuzzle,
      getStats
    }}>
      {children}
    </PuzzleContext.Provider>
  );
};