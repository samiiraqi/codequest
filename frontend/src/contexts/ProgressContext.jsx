import { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(() => {
    // Load from localStorage
    const saved = localStorage.getItem('codequest_progress');
    return saved ? JSON.parse(saved) : {
      totalRuns: 0,
      successfulRuns: 0,
      pythonRuns: 0,
      javascriptRuns: 0,
      htmlRuns: 0,
      exercisesCompleted: [],
      firstRunDate: null,
      lastRunDate: null,
    };
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem('codequest_progress', JSON.stringify(progress));
  }, [progress]);

  const trackCodeRun = (language, success, exerciseId = null) => {
    setProgress(prev => ({
      ...prev,
      totalRuns: prev.totalRuns + 1,
      successfulRuns: success ? prev.successfulRuns + 1 : prev.successfulRuns,
      [`${language}Runs`]: prev[`${language}Runs`] + 1,
      exercisesCompleted: exerciseId && !prev.exercisesCompleted.includes(exerciseId)
        ? [...prev.exercisesCompleted, exerciseId]
        : prev.exercisesCompleted,
      firstRunDate: prev.firstRunDate || new Date().toISOString(),
      lastRunDate: new Date().toISOString(),
    }));
  };

  const resetProgress = () => {
    const initialProgress = {
      totalRuns: 0,
      successfulRuns: 0,
      pythonRuns: 0,
      javascriptRuns: 0,
      htmlRuns: 0,
      exercisesCompleted: [],
      firstRunDate: null,
      lastRunDate: null,
    };
    setProgress(initialProgress);
    localStorage.setItem('codequest_progress', JSON.stringify(initialProgress));
  };

  return (
    <ProgressContext.Provider value={{ progress, trackCodeRun, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};