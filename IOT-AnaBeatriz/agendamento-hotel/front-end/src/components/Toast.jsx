import { useEffect } from 'react';

export default function Toast({ message, setMessage }) {
  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(''), 3000);
    }
  }, [message]);

  if (!message) return null;

  return <div className="toast">{message}</div>;
}