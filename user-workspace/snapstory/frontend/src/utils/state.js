/**
 * State management utilities
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing state with localStorage persistence
 * @param {string} key - localStorage key
 * @param {*} initialValue - Initial state value
 * @returns {Array} [value, setValue]
 */
export const usePersistedState = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, value]);

  return [value, setValue];
};

/**
 * Custom hook for managing state with undo/redo functionality
 * @param {*} initialValue - Initial state value
 * @returns {Object} State management object
 */
export const useUndoableState = (initialValue) => {
  const [states, setStates] = useState({
    past: [],
    present: initialValue,
    future: []
  });

  const canUndo = states.past.length > 0;
  const canRedo = states.future.length > 0;

  const undo = useCallback(() => {
    if (!canUndo) return;

    const { past, present } = states;
    const newPresent = past[past.length - 1];
    const newPast = past.slice(0, -1);

    setStates({
      past: newPast,
      present: newPresent,
      future: [present, ...states.future]
    });
  }, [canUndo, states]);

  const redo = useCallback(() => {
    if (!canRedo) return;

    const { present, future } = states;
    const newPresent = future[0];
    const newFuture = future.slice(1);

    setStates({
      past: [...states.past, present],
      present: newPresent,
      future: newFuture
    });
  }, [canRedo, states]);

  const setState = useCallback((newValue) => {
    setStates(prev => ({
      past: [...prev.past, prev.present],
      present: newValue,
      future: []
    }));
  }, []);

  return {
    state: states.present,
    setState,
    undo,
    redo,
    canUndo,
    canRedo
  };
};

/**
 * Custom hook for managing toggle state
 * @param {boolean} initialValue - Initial toggle state
 * @returns {Array} [value, toggle, setValue]
 */
export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle, setValue];
};

/**
 * Custom hook for managing state with debounced updates
 * @param {*} initialValue - Initial state value
 * @param {number} delay - Debounce delay in ms
 * @returns {Array} [value, setValue, debouncedValue]
 */
export const useDebouncedState = (initialValue, delay = 500) => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [value, setValue, debouncedValue];
};

/**
 * Custom hook for managing state with throttled updates
 * @param {*} initialValue - Initial state value
 * @param {number} limit - Throttle limit in ms
 * @returns {Array} [value, setValue, throttledValue]
 */
export const useThrottledState = (initialValue, limit = 500) => {
  const [value, setValue] = useState(initialValue);
  const [throttledValue, setThrottledValue] = useState(initialValue);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return [value, setValue, throttledValue];
};

/**
 * Custom hook for managing state with previous value tracking
 * @param {*} value - State value to track
 * @returns {*} Previous value
 */
export const usePrevious = (value) => {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
};