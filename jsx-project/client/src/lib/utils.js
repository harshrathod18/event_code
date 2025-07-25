// Utility functions for the admin dashboard

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString();
}

export function formatStatus(status) {
  return status ? 'Active' : 'Inactive';
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}