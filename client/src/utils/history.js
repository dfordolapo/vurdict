const HISTORY_KEY = 'vurdict_history';
const MAX_HISTORY = 3;

/**
 * Save a job to localStorage history
 * @param {Object} jobData { url, score, goal, experience, date }
 */
export function saveToHistory(jobData) {
  try {
    let history = getHistory();
    // Check if URL already exists, update it if so
    const existingIdx = history.findIndex(h => h.url === jobData.url);
    if (existingIdx >= 0) {
      history.splice(existingIdx, 1);
    }
    // Add to front
    history.unshift({
      ...jobData,
      date: jobData.date || new Date().toISOString()
    });
    // Truncate
    history = history.slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save to history', e);
  }
}

/**
 * Get history from localStorage
 * @returns {Array} List of past jobs
 */
export function getHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
