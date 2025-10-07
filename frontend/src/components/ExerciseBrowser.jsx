import { useState } from 'react';
import { exercises } from '../data/exercises';

function ExerciseBrowser({ language, onSelectExercise }) {
  const [showExercises, setShowExercises] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const languageExercises = exercises[language] || [];
  
  const filteredExercises = selectedDifficulty === 'all'
    ? languageExercises
    : languageExercises.filter(ex => ex.difficulty === selectedDifficulty);

  const difficultyColors = {
    beginner: 'from-green-400 to-green-600',
    intermediate: 'from-yellow-400 to-orange-500',
    advanced: 'from-red-500 to-pink-600'
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setShowExercises(!showExercises)}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        📚 {showExercises ? 'Hide' : 'Browse'} Exercises ({languageExercises.length} available)
      </button>

      {showExercises && (
        <div className="mt-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border-4 border-white/50">
          {/* Difficulty Filter */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <button
              onClick={() => setSelectedDifficulty('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedDifficulty === 'all'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All ({languageExercises.length})
            </button>
            <button
              onClick={() => setSelectedDifficulty('beginner')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedDifficulty === 'beginner'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🌱 Beginner
            </button>
            <button
              onClick={() => setSelectedDifficulty('intermediate')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedDifficulty === 'intermediate'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ⚡ Intermediate
            </button>
            <button
              onClick={() => setSelectedDifficulty('advanced')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedDifficulty === 'advanced'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🔥 Advanced
            </button>
          </div>

          {/* Exercise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExercises.map((exercise) => (
              <div
                key={exercise.id}
                className={`bg-gradient-to-br ${difficultyColors[exercise.difficulty]} rounded-xl p-5 text-white cursor-pointer transform hover:scale-105 transition-all shadow-lg hover:shadow-2xl`}
                onClick={() => {
                  onSelectExercise(exercise);
                  setShowExercises(false);
                }}
              >
                <div className="text-3xl mb-2">{exercise.title.split(' ')[0]}</div>
                <h3 className="font-bold text-lg mb-2">{exercise.title.substring(2)}</h3>
                <p className="text-sm opacity-90 mb-3">{exercise.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                    {exercise.difficulty}
                  </span>
                  <span className="text-sm font-medium">Click to try →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExerciseBrowser;