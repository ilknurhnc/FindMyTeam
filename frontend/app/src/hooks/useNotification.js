import { useState, useCallback } from 'react';

let notificationSetter = null;

export function useNotification() {
  const [notification, setNotification] = useState(null);
  
  // Global setter'ı kaydet
  if (!notificationSetter) {
    notificationSetter = setNotification;
  }

  const showNotification = useCallback((message, type = 'success') => {
    const id = Date.now();
    const newNotification = { id, message, type };
    
    if (notificationSetter) {
      notificationSetter(newNotification);
      
      setTimeout(() => {
        notificationSetter(null);
      }, 4000);
    }
  }, []);

  return { notification, showNotification };
}