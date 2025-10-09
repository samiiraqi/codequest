export const buildingTypes = {
  grass: {
    id: 'grass',
    name: '🌱 Grass',
    cost: 0,
    emoji: '🌱',
    size: 'small',
    description: 'Basic ground tile',
    unlockLevel: 1
  },
  tree: {
    id: 'tree',
    name: '🌳 Tree',
    cost: 50,
    emoji: '🌳',
    size: 'small',
    description: 'Adds nature to your kingdom',
    unlockLevel: 1
  },
  flower: {
    id: 'flower',
    name: '🌸 Flowers',
    cost: 30,
    emoji: '🌸',
    size: 'small',
    description: 'Beautiful decoration',
    unlockLevel: 1
  },
  house: {
    id: 'house',
    name: '🏠 House',
    cost: 100,
    emoji: '🏠',
    size: 'medium',
    description: 'Home for 5 citizens',
    unlockLevel: 1
  },
  shop: {
    id: 'shop',
    name: '🏪 Shop',
    cost: 200,
    emoji: '🏪',
    size: 'medium',
    description: 'Sell goods to citizens',
    unlockLevel: 2
  },
  fountain: {
    id: 'fountain',
    name: '⛲ Fountain',
    cost: 150,
    emoji: '⛲',
    size: 'medium',
    description: 'Increases happiness',
    unlockLevel: 2
  },
  farm: {
    id: 'farm',
    name: '🌾 Farm',
    cost: 300,
    emoji: '🌾',
    size: 'large',
    description: 'Grows food for kingdom',
    unlockLevel: 3
  },
  school: {
    id: 'school',
    name: '🏫 School',
    cost: 400,
    emoji: '🏫',
    size: 'large',
    description: 'Educate your citizens',
    unlockLevel: 3
  },
  circus: {
    id: 'circus',
    name: '🎪 Circus',
    cost: 500,
    emoji: '🎪',
    size: 'large',
    description: 'Entertainment for all',
    unlockLevel: 4
  },
  tower: {
    id: 'tower',
    name: '🗼 Tower',
    cost: 600,
    emoji: '🗼',
    size: 'large',
    description: 'Defend your kingdom',
    unlockLevel: 4
  },
  church: {
    id: 'church',
    name: '⛪ Church',
    cost: 700,
    emoji: '⛪',
    size: 'large',
    description: 'Spiritual center',
    unlockLevel: 5
  },
  castle: {
    id: 'castle',
    name: '🏰 Castle',
    cost: 1000,
    emoji: '🏰',
    size: 'xlarge',
    description: 'The crown jewel of your kingdom!',
    unlockLevel: 5
  },
  bank: {
    id: 'bank',
    name: '🏦 Bank',
    cost: 800,
    emoji: '🏦',
    size: 'large',
    description: 'Manage kingdom finances',
    unlockLevel: 5
  },
  factory: {
    id: 'factory',
    name: '🏭 Factory',
    cost: 900,
    emoji: '🏭',
    size: 'xlarge',
    description: 'Industrial production',
    unlockLevel: 6
  },
  stadium: {
    id: 'stadium',
    name: '🏟️ Stadium',
    cost: 1200,
    emoji: '🏟️',
    size: 'xlarge',
    description: 'Sports and events',
    unlockLevel: 7
  }
};

export const getSizeMultiplier = (size) => {
  switch(size) {
    case 'small': return 1;
    case 'medium': return 1.5;
    case 'large': return 2;
    case 'xlarge': return 2.5;
    default: return 1;
  }
};