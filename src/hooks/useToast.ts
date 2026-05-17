import React, { useState, useCallback } from 'react';
import { ToastType } from '../types/toast';
import { Toast } from '../components/Toast';

export const useToast = () => {
  const [state, setState] = useState({
    message: '',
    type: 'info' as ToastType,
    isVisible: false
  });

  const show = useCallback((message: string, type: ToastType = 'info') => {
    setState({ message, type, isVisible: true });
    setTimeout(() => setState(prev => ({ ...prev, isVisible: false })), 3000);
  }, []);

  const ToastComponent = React.memo(function ToastDisplay() {
    return React.createElement(Toast, {
      message: state.message,
      type: state.type,
      isVisible: state.isVisible
    });
  });

  ToastComponent.displayName = 'ToastComponent';

  return {
    show,
    ToastComponent
  };
}; 