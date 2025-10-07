import { useState, useEffect } from "react";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "~/utils/storage";

/**
 * Custom hook that provides useState-like functionality with automatic localStorage persistence.
 *
 * @param key - The localStorage key to use
 * @param initialValue - The initial value if nothing exists in localStorage
 * @returns A tuple of [value, setValue] similar to useState
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  // Initialize state with value from localStorage or initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    return loadFromLocalStorage(key, initialValue);
  });

  // Update localStorage whenever the value changes
  useEffect(() => {
    saveToLocalStorage(key, storedValue);
  }, [key, storedValue]);

  // Wrapper function that supports both direct values and updater functions
  const setValue = (value: T | ((prev: T) => T)) => {
    setStoredValue((prev) => {
      const newValue = value instanceof Function ? value(prev) : value;
      return newValue;
    });
  };

  return [storedValue, setValue];
}
