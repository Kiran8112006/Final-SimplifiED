// Reusable accessible button component for EchoNotes
// Variants: primary (blue), secondary (gray), danger (red)
// States: normal, loading (shows spinner), disabled
// Props:
//   - children: button text or content
//   - onClick: click handler function
//   - variant: 'primary' | 'secondary' | 'danger' (default: primary)
//   - loading: boolean to show loading spinner
//   - disabled: boolean to disable button
//   - fullWidth: boolean to make button full width
//   - className: additional Tailwind classes
// Styling: All inline Tailwind, dyslexia-friendly colors, large tap targets
// Accessibility: Focus rings, disabled states, ARIA labels

import React from 'react';

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  loading = false, 
  disabled = false,
  fullWidth = false,
  className = '',
  type = 'button'
}) {
  // Base classes: padding, rounded corners, font, transitions, flex center
  const baseClasses = 'px-6 py-3 rounded-lg font-dyslexic text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Variant color classes object with hover and focus states
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-[#3A7BC8] focus:ring-primary/50',
    secondary: 'bg-gray-200 text-textDark hover:bg-gray-300 focus:ring-gray-400/50',
    danger: 'bg-error text-white hover:bg-red-600 focus:ring-error/50',
  };
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
    >
      {/* Loading spinner - shows when loading is true */}
      {loading && (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      )}
      {children}
    </button>
  );
}