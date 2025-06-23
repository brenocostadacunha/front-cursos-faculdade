import { useState, useCallback } from 'react';

export interface NotificationState {
  message: string;
  type: 'error' | 'success' | 'warning' | 'info';
  show: boolean;
}

export interface UseNotificationReturn {
  notification: NotificationState;
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
  hideNotification: () => void;
}

export const useNotification = (): UseNotificationReturn => {
  const [notification, setNotification] = useState<NotificationState>({
    message: '',
    type: 'info',
    show: false,
  });

  const showNotification = useCallback((message: string, type: NotificationState['type']) => {
    setNotification({
      message,
      type,
      show: true,
    });

    // Auto-hide após 5 segundos
    setTimeout(() => {
      hideNotification();
    }, 5000);
  }, []);

  const showError = useCallback((message: string) => {
    showNotification(message, 'error');
  }, [showNotification]);

  const showSuccess = useCallback((message: string) => {
    showNotification(message, 'success');
  }, [showNotification]);

  const showWarning = useCallback((message: string) => {
    showNotification(message, 'warning');
  }, [showNotification]);

  const showInfo = useCallback((message: string) => {
    showNotification(message, 'info');
  }, [showNotification]);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({
      ...prev,
      show: false,
    }));
  }, []);

  return {
    notification,
    showError,
    showSuccess,
    showWarning,
    showInfo,
    hideNotification,
  };
}; 