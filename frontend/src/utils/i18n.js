/**
 * Internationalization utilities
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Default translations
const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      login: 'Login',
      register: 'Register',
      dashboard: 'Dashboard',
      logout: 'Logout',
      error: {
        required: 'This field is required',
        email: 'Invalid email address',
        password: 'Password must be at least 8 characters'
      }
    }
  },
  es: {
    translation: {
      welcome: 'Bienvenido',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      dashboard: 'Panel',
      logout: 'Cerrar sesión',
      error: {
        required: 'Este campo es obligatorio',
        email: 'Dirección de correo inválida',
        password: 'La contraseña debe tener al menos 8 caracteres'
      }
    }
  }
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

/**
 * Change language
 * @param {string} lang - Language code (en/es)
 */
export const changeLanguage = (lang) => {
  i18n.changeLanguage(lang);
};

/**
 * Get current language
 * @returns {string} Current language code
 */
export const getCurrentLanguage = () => {
  return i18n.language;
};

/**
 * Translation shortcut
 * @param {string} key - Translation key
 * @param {Object} options - Translation options
 * @returns {string} Translated text
 */
export const t = (key, options) => {
  return i18n.t(key, options);
};