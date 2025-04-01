/**
 * Debugging utilities
 */

/**
 * Debug wrapper that only logs in development
 * @param {string} namespace - Debug namespace
 * @returns {Function} Debug function
 */
export const createDebugger = (namespace) => {
  return (...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${namespace}]`, ...args);
    }
  };
};

/**
 * Log component props and state
 * @param {string} componentName - Component name
 * @param {Object} props - Component props
 * @param {Object} state - Component state
 */
export const logComponentState = (componentName, props, state) => {
  if (process.env.NODE_ENV === 'development') {
    console.groupCollapsed(`[${componentName}] State Update`);
    console.log('Props:', props);
    console.log('State:', state);
    console.groupEnd();
  }
};

/**
 * Measure function execution time
 * @param {Function} fn - Function to measure
 * @param {string} [name] - Measurement name
 * @returns {*} Function result
 */
export const measureExecution = (fn, name = 'Function') => {
  if (process.env.NODE_ENV === 'development') {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`[PERF] ${name} took ${(end - start).toFixed(2)}ms`);
    return result;
  }
  return fn();
};

/**
 * Create a debug scope with timing
 * @param {string} scopeName - Scope name
 * @returns {Object} Debug scope
 */
export const createDebugScope = (scopeName) => {
  const startTime = performance.now();
  const debug = createDebugger(scopeName);

  return {
    log: debug,
    time: (message) => {
      const elapsed = performance.now() - startTime;
      debug(`${message} - ${elapsed.toFixed(2)}ms`);
    },
    end: () => {
      const totalTime = performance.now() - startTime;
      debug(`Completed in ${totalTime.toFixed(2)}ms`);
    }
  };
};

/**
 * Debug hook for tracking component lifecycle
 * @param {string} componentName - Component name
 */
export const useDebugLifecycle = (componentName) => {
  const debug = createDebugger(componentName);

  React.useEffect(() => {
    debug('Component mounted');
    return () => debug('Component unmounted');
  }, []);

  React.useEffect(() => {
    debug('Component updated');
  });
};

/**
 * Debug hook for tracking state changes
 * @param {string} name - State name
 * @param {*} value - State value
 */
export const useDebugState = (name, value) => {
  const debug = createDebugger('State');
  const prevValue = React.useRef(value);

  React.useEffect(() => {
    if (prevValue.current !== value) {
      debug(`${name} changed:`, {
        from: prevValue.current,
        to: value
      });
      prevValue.current = value;
    }
  }, [value]);
};