import { useState } from 'react';
import { challenges } from '../data/challenges';
import confetti from 'canvas-confetti';

function ChallengeMode({ language, onLoadCode }) {
  const [showChallenges, setShowChallenges] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [completed, setCompleted] = useState(false);

  const languageChallenges = challenges[language] || [];

  const selectChallenge = (challenge) => {
    setCurrentChallenge(challenge);
    setUserCode(challenge.starterCode);
    setShowHint(false);
    setShowSolution(false);
    setCompleted(false);
    onLoadCode(challenge.starterCode);
  };

  const checkSolution = () => {
    if (!currentChallenge) return;
    
    const userClean = userCode.trim().replace(/\s+/g, ' ');
    const solutionClean = currentChallenge.solution.trim().replace(/\s+/g, ' ');
    
    if (userClean === solutionClean) {
      setCompleted(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else {
      alert('Not quite right! Keep trying or check the hint! 💪');
    }
  };

  const loadSolution = () => {
    setShowSolution(true);
    onLoadCode(currentChallenge.solution);
  };

  const difficultyColors = {
    beginner: 'from-green-400 to-green-600',
    intermediate: 'from-yellow-400 to-orange-500',
    advanced: 'from-red-500 to-pink-600'
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setShowChallenges(!showChallenges)}
        className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        🎮 {showChallenges ? 'Hide' : 'Show'} Challenges ({languageChallenges.length} available)
      </button>

      {showChallenges && (
        <div className="mt-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border-4 border-white/50">
          {!currentChallenge ? (
            <>
              <h3 className="text-2xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
                Choose a Challenge
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {languageChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    onClick={() => selectChallenge(challenge)}
                    className={`bg-gradient-to-br ${difficultyColors[challenge.difficulty]} rounded-xl p-5 text-white cursor-pointer transform hover:scale-105 transition-all shadow-lg hover:shadow-2xl`}
                  >
                    <h4 className="font-bold text-xl mb-2">{challenge.title}</h4>
                    <p className="text-sm opacity-90 mb-3">{challenge.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                        {challenge.difficulty}
                      </span>
                      <span className="text-sm font-medium">Try it →</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>
              {/* Challenge Header */}
              <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-gray-800">{currentChallenge.title}</h3>
                    <p className="text-gray-600 mt-2">{currentChallenge.description}</p>
                  </div>
                  <button
                    onClick={() => setCurrentChallenge(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {completed && (
                  <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-xl mb-4 animate-bounce">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">🎉</span>
                      <div>
                        <p className="font-bold text-green-800 text-lg">Challenge Complete!</p>
                        <p className="text-green-700 text-sm">{currentChallenge.explanation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  💡 {showHint ? 'Hide' : 'Show'} Hint
                </button>
                <button
                  onClick={loadSolution}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  👀 Show Solution
                </button>
                <button
                  onClick={() => setCurrentChallenge(null)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all"
                >
                  ← Back
                </button>
              </div>

              {/* Hint */}
              {showHint && (
                <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-xl mb-4">
                  <p className="font-bold text-blue-800 mb-1">💡 Hint:</p>
                  <p className="text-blue-700">{currentChallenge.hint}</p>
                </div>
              )}

              {/* Solution */}
              {showSolution && (
                <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded-xl mb-4">
                  <p className="font-bold text-orange-800 mb-2">👀 Solution:</p>
                  <pre className="text-orange-900 font-mono text-sm bg-white p-3 rounded-lg overflow-x-auto">
                    {currentChallenge.solution}
                  </pre>
                  <p className="text-orange-700 text-sm mt-2">{currentChallenge.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChallengeMode;