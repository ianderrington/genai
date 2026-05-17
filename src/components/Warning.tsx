'use client';

import React from 'react';

type WarningType = 'ferromagnetic' | 'hazard' | 'neural' | 'default';

interface WarningProps {
  type?: WarningType;
  children: React.ReactNode;
  className?: string;
}

const warningStyles: Record<WarningType, string> = {
  ferromagnetic: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 text-yellow-800 dark:text-yellow-200',
  hazard: 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200',
  neural: 'bg-purple-50 dark:bg-purple-900/20 border-purple-500 text-purple-800 dark:text-purple-200',
  default: 'bg-gray-50 dark:bg-gray-900/20 border-gray-500 text-gray-800 dark:text-gray-200',
};

export default function Warning({ type = 'default', children, className = '' }: WarningProps) {
  const baseStyles = 'p-4 rounded-lg shadow-md border-l-4 font-medium mb-4';
  const colorStyles = warningStyles[type];
  
  return (
    <div className={`${baseStyles} ${colorStyles} ${className}`}>
      <div className="flex items-center">
        <span className="mr-2">⚠️</span>
        <span>{children}</span>
      </div>
    </div>
  );
} 