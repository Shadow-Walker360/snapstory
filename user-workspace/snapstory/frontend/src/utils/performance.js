/**
 * Performance monitoring utilities
 */

const metrics = {
  navigationTiming: {},
  resourceTiming: [],
  paintTiming: {},
  customMetrics: {}
};

/**
 * Start performance monitoring
 */
export const startPerformanceMonitoring = () => {
  if (window.performance) {
    // Capture navigation timing
    const navigationTiming = performance.getEntriesByType('navigation')[0];
    if (navigationTiming) {
      metrics.navigationTiming = {
        dns: navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart,
        connect: navigationTiming.connectEnd - navigationTiming.connectStart,
        ttfb: navigationTiming.responseStart - navigationTiming.requestStart,
        network: navigationTiming.responseEnd - navigationTiming.startTime,
        domLoad: navigationTiming.domComplete - navigationTiming.domLoading,
        windowLoad: navigationTiming.loadEventEnd - navigationTiming.loadEventStart
      };
    }

    // Capture resource timing
    metrics.resourceTiming = performance.getEntriesByType('resource');

    // Capture paint timing
    const paintTiming = performance.getEntriesByType('paint');
    if (paintTiming) {
      paintTiming.forEach(entry => {
        metrics.paintTiming[entry.name] = entry.startTime;
      });
    }
  }
};

/**
 * Mark a custom performance point
 * @param {string} name - Marker name
 */
export const mark = (name) => {
  if (window.performance) {
    performance.mark(name);
  }
};

/**
 * Measure between two marks
 * @param {string} name - Measurement name
 * @param {string} startMark - Start mark name
 * @param {string} endMark - End mark name
 */
export const measure = (name, startMark, endMark) => {
  if (window.performance) {
    performance.measure(name, startMark, endMark);
    const measures = performance.getEntriesByName(name);
    if (measures.length) {
      metrics.customMetrics[name] = measures[0].duration;
    }
  }
};

/**
 * Get performance metrics
 * @returns {Object} Performance metrics
 */
export const getPerformanceMetrics = () => {
  return metrics;
};

/**
 * Log performance metrics
 */
export const logPerformanceMetrics = () => {
  console.group('Performance Metrics');
  console.log('Navigation Timing:', metrics.navigationTiming);
  console.log('Paint Timing:', metrics.paintTiming);
  console.log('Custom Metrics:', metrics.customMetrics);
  console.groupEnd();
};

/**
 * Track long tasks (tasks over 50ms)
 */
export const trackLongTasks = () => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        console.warn('Long task detected:', entry);
      });
    });
    observer.observe({ entryTypes: ['longtask'] });
  }
};