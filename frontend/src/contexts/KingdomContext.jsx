import { createContext, useContext, useState, useEffect } from 'react';

const KingdomContext = createContext();

export const useKingdom = () => {
  const context = useContext(KingdomContext);
  if (!context) {
    throw new Error('useKingdom must be used within KingdomProvider');
  }
  return context;
};

export const KingdomProvider = ({ children }) => {
  const [coins, setCoins] = useState(() => {
    return parseInt(localStorage.getItem('codequest_coins') || '100'); // Start with 100 coins
  });

  const [buildings, setBuildings] = useState(() => {
    const saved = localStorage.getItem('codequest_kingdom_buildings');
    return saved ? JSON.parse(saved) : [];
  });

  const [level, setLevel] = useState(() => {
    return parseInt(localStorage.getItem('codequest_kingdom_level') || '1');
  });

  const [totalCoinsEarned, setTotalCoinsEarned] = useState(() => {
    return parseInt(localStorage.getItem('codequest_total_coins_earned') || '0');
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('codequest_coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('codequest_kingdom_buildings', JSON.stringify(buildings));
  }, [buildings]);

  useEffect(() => {
    localStorage.setItem('codequest_kingdom_level', level.toString());
  }, [level]);

  useEffect(() => {
    localStorage.setItem('codequest_total_coins_earned', totalCoinsEarned.toString());
  }, [totalCoinsEarned]);

  // Award coins
  const awardCoins = (amount, reason) => {
    setCoins(prev => prev + amount);
    setTotalCoinsEarned(prev => prev + amount);
    
    // Check for level up (every 500 coins earned)
    const newTotalCoins = totalCoinsEarned + amount;
    const newLevel = Math.floor(newTotalCoins / 500) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      return { leveledUp: true, newLevel };
    }
    
    return { leveledUp: false };
  };

  // Spend coins
  const spendCoins = (amount) => {
    if (coins >= amount) {
      setCoins(prev => prev - amount);
      return true;
    }
    return false;
  };

  // Add building
  const addBuilding = (building) => {
    setBuildings(prev => [...prev, building]);
  };

  // Remove building
  const removeBuilding = (id) => {
    setBuildings(prev => prev.filter(b => b.id !== id));
  };

  // Clear all buildings
  const clearKingdom = () => {
    if (window.confirm('Are you sure you want to reset your kingdom?')) {
      setBuildings([]);
      setCoins(100);
      setLevel(1);
      setTotalCoinsEarned(0);
    }
  };

  // Calculate kingdom stats
  const getKingdomStats = () => {
    const population = buildings.filter(b => b.type === 'house').length * 5;
    const happiness = buildings.length * 2;
    const kingdomValue = buildings.reduce((sum, b) => sum + b.cost, 0);
    
    return {
      population,
      happiness: Math.min(happiness, 100),
      kingdomValue,
      buildingCount: buildings.length
    };
  };

  return (
    <KingdomContext.Provider value={{
      coins,
      buildings,
      level,
      totalCoinsEarned,
      awardCoins,
      spendCoins,
      addBuilding,
      removeBuilding,
      clearKingdom,
      getKingdomStats
    }}>
      {children}
    </KingdomContext.Provider>
  );
};