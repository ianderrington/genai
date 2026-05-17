import React from 'react';
import styles from '../styles/Toast.module.css';
import { ToastType } from '../types/toast';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, type, isVisible }) => {
  const toastClasses = [
    styles.toast,
    styles[type],
    isVisible ? styles.visible : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={toastClasses}>
      {message}
    </div>
  );
}; 