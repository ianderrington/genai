'use client';

import React from 'react';

interface WarningProps {
  children: React.ReactNode;
  type?: 'default' | 'ferromagnetic' | 'hazard' | 'neural';
  className?: string;
}

export default function Warning({ children, type = 'default', className = '' }: WarningProps) {
  const baseStyles = 'p-4 rounded-lg flex items-center space-x-2 mb-4 font-medium';
  
  const typeStyles = {
    default: 'bg-gray-800/80 text-yellow-400 border-l-4 border-yellow-400',
    ferromagnetic: 'bg-gray-800/80 text-yellow-400 border-l-4 border-yellow-400',
    hazard: 'bg-gray-800/80 text-red-400 border-l-4 border-red-400',
    neural: 'bg-gray-800/80 text-purple-400 border-l-4 border-purple-400',
  };

  return (
    <div className={`${baseStyles} ${typeStyles[type]} ${className}`}>
      <span className="text-xl">⚠️</span>
      <span>{children}</span>
    </div>
  );
} 