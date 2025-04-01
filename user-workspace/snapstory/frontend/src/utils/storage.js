/**
 * localStorage utility with safe JSON handling
 */
export const storage = {
  /**
   * Get item from localStorage
   * @param {string} key 
   * @returns {any|null} Parsed value or null if not found/invalid
   */
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return null;
    }
  },

  /**
   * Set item in localStorage
   * @param {string} key 
   * @param {any} value 
   */
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key 
   */
  remove: (key) => {
    localStorage.removeItem(key);
  },

  /**
   * Clear all localStorage
   */
  clear: () => {
    localStorage.clear();
  }
};

// Token specific operations
export const tokenStorage = {
  get: () => storage.get('authToken'),
  set: (token) => storage.set('authToken', token),
  remove: () => storage.remove('authToken'),
  exists: () => !!storage.get('authToken')
};

// User session operations
export const userStorage = {
  get: () => storage.get('userData'),
  set: (user) => storage.set('userData', user),
  remove: () => storage.remove('userData'),
  getProfile: () => storage.get('userData')?.profile
};

// Theme preference operations
export const themeStorage = {
  get: () => storage.get('themePreference') || 'light',
  set: (theme) => storage.set('themePreference', theme),
  toggle: () => {
    const current = themeStorage.get();
    const newTheme = current === 'light' ? 'dark' : 'light';
    themeStorage.set(newTheme);
    return newTheme;
  }
};

// Cache operations
export const cacheStorage = {
  get: (key) => storage.get(`cache_${key}`),
  set: (key, value, ttl = 3600) => {
    const now = new Date();
    storage.set(`cache_${key}`, {
      value,
      expires: now.getTime() + (ttl * 1000)
    });
  },
  isExpired: (key) => {
    const item = storage.get(`cache_${key}`);
    if (!item) return true;
    return new Date().getTime() > item.expires;
  }
};