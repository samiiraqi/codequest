function ExecutionStats({ executionTime, language, linesOfCode }) {
  return (
    <div className="flex gap-3 flex-wrap">
      {executionTime > 0 && (
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-lg border-2 border-green-300">
          <div className="text-xs text-green-700 font-medium">Execution Time</div>
          <div className="text-lg font-black text-green-800">⚡ {executionTime}s</div>
        </div>
      )}
      <div className="bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 rounded-lg border-2 border-blue-300">
        <div className="text-xs text-blue-700 font-medium">Language</div>
        <div className="text-lg font-black text-blue-800">
          {language === 'python' && '🐍 Python'}
          {language === 'javascript' && '🟨 JS'}
          {language === 'html' && '🎨 HTML'}
        </div>
      </div>
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-lg border-2 border-purple-300">
        <div className="text-xs text-purple-700 font-medium">Lines of Code</div>
        <div className="text-lg font-black text-purple-800">📝 {linesOfCode}</div>
      </div>
    </div>
  );
}

export default ExecutionStats;