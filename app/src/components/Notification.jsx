import React, { useEffect, useState } from 'react';
import { useNotification } from '../hooks/useNotification';

export default function Notification() {
  const { notification } = useNotification();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (notification) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3600);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [notification]);

  if (!notification) return null;

  return (
    <div className={`notification ${notification.type} ${show ? 'show' : ''}`}>
      <i className={`fas fa-${notification.type === 'success' ? 'check-circle' : 'exclamation-triangle'}`}></i>
      {notification.message}
    </div>
  );
}
