import { format, formatDistanceToNow, parseISO, isToday, isYesterday, isThisYear } from 'date-fns';

/**
 * Format date to human-readable string with smart formatting
 * @param {Date|string} date - Date object or ISO string
 * @returns {string} Formatted date string
 */
export const formatDateSmart = (date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(dateObj)) {
    return format(dateObj, 'h:mm a');
  } 
  if (isYesterday(dateObj)) {
    return 'Yesterday';
  }
  if (isThisYear(dateObj)) {
    return format(dateObj, 'MMM d');
  }
  return format(dateObj, 'MMM d, yyyy');
};

/**
 * Format date to relative time (e.g. "2 hours ago")
 * @param {Date|string} date - Date object or ISO string
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

/**
 * Format date range
 * @param {Date|string} startDate 
 * @param {Date|string} endDate 
 * @returns {string} Formatted date range string
 */
export const formatDateRange = (startDate, endDate) => {
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  
  if (format(start, 'yyyy-MM-dd') === format(end, 'yyyy-MM-dd')) {
    return format(start, 'MMM d, yyyy');
  }
  if (start.getFullYear() === end.getFullYear()) {
    return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
  }
  return `${format(start, 'MMM d, yyyy')} - ${format(end, 'MMM d, yyyy')}`;
};

/**
 * Format time duration in hours and minutes
 * @param {number} minutes 
 * @returns {string} Formatted duration string
 */
export const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

// Common date formats
export const DATE_FORMATS = {
  short: 'MMM d',
  medium: 'MMM d, yyyy',
  long: 'EEEE, MMMM d, yyyy',
  time: 'h:mm a',
  dateTime: 'MMM d, yyyy h:mm a'
};