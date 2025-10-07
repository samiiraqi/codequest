import { useState, useEffect } from 'react';

function SavedCodeManager({ language, onLoadCode }) {
  const [savedCodes, setSavedCodes] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [codeToSave, setCodeToSave] = useState('');

  // Load saved codes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`codequest_saved_${language}`);
    if (saved) {
      setSavedCodes(JSON.parse(saved));
    } else {
      setSavedCodes([]);
    }
  }, [language]);

  const saveCode = () => {
    if (!saveName.trim() || !codeToSave.trim()) return;

    const newSave = {
      id: Date.now(),
      name: saveName,
      code: codeToSave,
      language: language,
      date: new Date().toISOString(),
    };

    const updated = [...savedCodes, newSave];
    setSavedCodes(updated);
    localStorage.setItem(`codequest_saved_${language}`, JSON.stringify(updated));
    
    setShowSaveModal(false);
    setSaveName('');
    setCodeToSave('');
  };

  const deleteCode = (id) => {
    const updated = savedCodes.filter(s => s.id !== id);
    setSavedCodes(updated);
    localStorage.setItem(`codequest_saved_${language}`, JSON.stringify(updated));
  };

  const loadCode = (code) => {
    onLoadCode(code);
  };

  return (
    <div className="mb-6">
      {/* Saved Codes List */}
      {savedCodes.length > 0 && (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 mb-4 border-2 border-white/50">
          <h3 className="font-bold text-lg mb-3 text-gray-800">
            💾 Saved {language.charAt(0).toUpperCase() + language.slice(1)} Code ({savedCodes.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {savedCodes.map((saved) => (
              <div
                key={saved.id}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 border-2 border-gray-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 truncate">{saved.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(saved.date).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteCode(saved.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    🗑️
                  </button>
                </div>
                <button
                  onClick={() => loadCode(saved.code)}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all text-sm"
                >
                  📂 Load
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">💾 Save Your Code</h3>
            <input
              type="text"
              placeholder="Give it a name..."
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={saveCode}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                ✅ Save
              </button>
              <button
                onClick={() => {
                  setShowSaveModal(false);
                  setSaveName('');
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SavedCodeManager;