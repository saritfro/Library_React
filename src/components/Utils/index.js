// Helper function to create page URLs
export function createPageUrl(pageName) {
    switch(pageName) {
      case 'Dashboard':
        return '/';
      case 'Loans':
        return '/loans';
      case 'Settings':
        return '/settings';
      default:
        return '/';
    }
  }
  
  // Helper function for conditional class names
  export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
  }