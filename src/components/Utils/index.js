// Helper function to create page URLs
export function createPageUrl(pageName) {
  switch (pageName) {
    case 'FormManager':
      return '/FormManager';
    case 'Dashboard':
      return '/Dashboard';
    case 'UserLoans':
      return '/UserLoans';
    case 'UserReturn':
      return '/UserReturn';
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