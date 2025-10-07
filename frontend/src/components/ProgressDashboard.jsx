import { useProgress } from '../contexts/ProgressContext';

function ProgressDashboard() {
  const { progress } = useProgress();

  const successRate = progress.totalRuns > 0 
    ? Math.round((progress.successfulRuns / progress.totalRuns) * 100)
    : 0;

  const stats = [
    { label: 'Total Runs', value: progress.totalRuns, icon: '🚀', color: 'from-blue-500 to-blue-600' },
    { label: 'Success Rate', value: `${successRate}%`, icon: '✅', color: 'from-green-500 to-green-600' },
    { label: 'Python', value: progress.pythonRuns, icon: '🐍', color: 'from-blue-400 to-blue-500' },
    { label: 'JavaScript', value: progress.javascriptRuns, icon: '🟨', color: 'from-yellow-400 to-yellow-500' },
    { label: 'HTML', value: progress.htmlRuns, icon: '🎨', color: 'from-orange-400 to-red-500' },
    { label: 'Exercises', value: progress.exercisesCompleted.length, icon: '🏆', color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 border-4 border-white/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          📊 Your Progress
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center transform hover:scale-105 transition-all"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className={`text-2xl font-black bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`}>
              {stat.value}
            </div>
            <div className="text-xs text-gray-600 font-medium mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      {progress.totalRuns > 0 && (
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span className="font-medium">Success Rate</span>
            <span className="font-bold">{successRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500 flex items-center justify-end"
              style={{ width: `${successRate}%` }}
            >
              {successRate > 10 && (
                <span className="text-xs text-white font-bold mr-2">
                  {successRate}%
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgressDashboard;