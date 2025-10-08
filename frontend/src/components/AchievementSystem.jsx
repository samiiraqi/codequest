import { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/sounds';

function AchievementSystem() {
  const { progress } = useProgress();
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState(null);

  const achievements = [
    {
      id: 'first_run',
      name: 'Hello World!',
      description: 'Run your first code',
      icon: '🎉',
      condition: (p) => p.totalRuns >= 1,
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'beginner',
      name: 'Getting Started',
      description: 'Run code 5 times',
      icon: '🌟',
      condition: (p) => p.totalRuns >= 5,
      color: 'from-green-400 to-green-600'
    },
    {
      id: 'polyglot',
      name: 'Polyglot',
      description: 'Try all 3 languages',
      icon: '🌍',
      condition: (p) => p.pythonRuns > 0 && p.javascriptRuns > 0 && p.htmlRuns > 0,
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 'persistent',
      name: 'Persistent Coder',
      description: 'Run code 10 times',
      icon: '💪',
      condition: (p) => p.totalRuns >= 10,
      color: 'from-orange-400 to-orange-600'
    },
    {
      id: 'python_master',
      name: 'Python Pro',
      description: 'Run Python code 10 times',
      icon: '🐍',
      condition: (p) => p.pythonRuns >= 10,
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 'js_master',
      name: 'JavaScript Ninja',
      description: 'Run JavaScript code 10 times',
      icon: '🥷',
      condition: (p) => p.javascriptRuns >= 10,
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 'html_master',
      name: 'HTML Artist',
      description: 'Run HTML code 10 times',
      icon: '🎨',
      condition: (p) => p.htmlRuns >= 10,
      color: 'from-red-400 to-red-600'
    },
    {
      id: 'perfectionist',
      name: 'Perfectionist',
      description: '90% success rate',
      icon: '✨',
      condition: (p) => p.totalRuns >= 10 && (p.successfulRuns / p.totalRuns) >= 0.9,
      color: 'from-pink-400 to-pink-600'
    },
    {
      id: 'dedicated',
      name: 'Dedicated Learner',
      description: 'Run code 25 times',
      icon: '🔥',
      condition: (p) => p.totalRuns >= 25,
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'champion',
      name: 'Coding Champion',
      description: 'Run code 50 times',
      icon: '🏆',
      condition: (p) => p.totalRuns >= 50,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'exercise_master',
      name: 'Exercise Master',
      description: 'Complete 10 exercises',
      icon: '📚',
      condition: (p) => p.exercisesCompleted.length >= 10,
      color: 'from-indigo-400 to-indigo-600'
    },
    {
      id: 'legend',
      name: 'Legendary Coder',
      description: 'Run code 100 times',
      icon: '👑',
      condition: (p) => p.totalRuns >= 100,
      color: 'from-purple-600 to-pink-600'
    },
  ];

  // Check for newly unlocked achievements
  useEffect(() => {
    const savedUnlocked = JSON.parse(localStorage.getItem('codequest_achievements') || '[]');
    const currentlyUnlocked = achievements
      .filter(achievement => achievement.condition(progress))
      .map(a => a.id);

    // Find newly unlocked
    const newlyUnlocked = currentlyUnlocked.filter(id => !savedUnlocked.includes(id));
    
    if (newlyUnlocked.length > 0) {
      const newAchievement = achievements.find(a => a.id === newlyUnlocked[0]);
      setNewAchievement(newAchievement);
      // Play achievement sound
      playSound('achievement');
      
      // Celebrate!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF6347']
      });

      // Auto-hide after 5 seconds
      setTimeout(() => setNewAchievement(null), 5000);
    }

    setUnlockedAchievements(currentlyUnlocked);
    localStorage.setItem('codequest_achievements', JSON.stringify(currentlyUnlocked));
  }, [progress]);

  const unlockedCount = unlockedAchievements.length;
  const totalCount = achievements.length;
  const progressPercentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 border-4 border-white/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
          🏆 Achievements
        </h2>
        <div className="text-right">
          <div className="text-2xl font-black text-yellow-600">
            {unlockedCount}/{totalCount}
          </div>
          <div className="text-xs text-gray-600 font-medium">
            {progressPercentage}% Complete
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {achievements.map((achievement) => {
          const isUnlocked = unlockedAchievements.includes(achievement.id);
          return (
            <div
              key={achievement.id}
              className={`rounded-xl p-4 text-center transition-all transform hover:scale-105 ${
                isUnlocked
                  ? `bg-gradient-to-br ${achievement.color} shadow-lg`
                  : 'bg-gray-200 opacity-40'
              }`}
            >
              <div className={`text-4xl mb-2 ${isUnlocked ? '' : 'grayscale'}`}>
                {achievement.icon}
              </div>
              <div className={`text-sm font-bold ${isUnlocked ? 'text-white' : 'text-gray-600'}`}>
                {achievement.name}
              </div>
              <div className={`text-xs mt-1 ${isUnlocked ? 'text-white/80' : 'text-gray-500'}`}>
                {achievement.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Achievement Popup */}
      {newAchievement && (
        <div className="fixed top-20 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl shadow-2xl p-6 z-50 animate-bounce max-w-sm">
          <div className="text-center">
            <div className="text-6xl mb-3">{newAchievement.icon}</div>
            <div className="text-xl font-black mb-2">Achievement Unlocked!</div>
            <div className="text-lg font-bold">{newAchievement.name}</div>
            <div className="text-sm opacity-90 mt-1">{newAchievement.description}</div>
          </div>
          <button
            onClick={() => setNewAchievement(null)}
            className="absolute top-2 right-2 text-white/70 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default AchievementSystem;