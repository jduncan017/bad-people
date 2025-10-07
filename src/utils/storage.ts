/**
 * Save data to localStorage with error handling
 */
export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
  }
}

/**
 * Load data from localStorage with error handling
 */
export function loadFromLocalStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch (error) {
    console.error(`Error loading from localStorage (${key}):`, error);
    return fallback;
  }
}

/**
 * Remove an item from localStorage
 */
export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
  }
}

/**
 * Clear all session-related data from localStorage
 */
export function clearSessionStorage(): void {
  const sessionKeys = [
    "shownPrompts",
    "promptHistory",
    "badPrompts",
    "totalGenerated",
    "categoryUsage",
  ];

  sessionKeys.forEach((key) => removeFromLocalStorage(key));
}
