// components/HelloComponent.tsx
import React, {useState} from 'react';

const HelloComponent: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  const fetchMessage = async (): Promise<void> => {
    try {
      const response = await fetch('/api/hello'); //! api route
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || '');
      } else {
        setMessage(data.error || 'Error occurred');
      }
    } catch (error) {
      setMessage('Failed to fetch data');
    }
  };

  return (
    <div>
      <button onClick={fetchMessage}>Say Hello</button>
      <p>{message}</p>
    </div>
  );
};

export default HelloComponent;
