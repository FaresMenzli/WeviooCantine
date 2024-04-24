import React, { useState, useEffect } from 'react';

interface ElementorCounterProps {
  initialValue?: number;
  maxIncrement?: number;
  delay?: number;
  stopAt?: number;
}

const ElementorCounter: React.FC<ElementorCounterProps> = ({ initialValue = 0, maxIncrement = 10, delay = 1000, stopAt }) => {
  const [count, setCount] = useState<number>(initialValue);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIncrement = Math.floor(Math.random() * (maxIncrement + 1));
      setCount(prevCount => {
        const newCount = prevCount + randomIncrement;
        if (stopAt !== undefined && newCount >= stopAt) {
          clearInterval(intervalId);
          return stopAt;
        }
        return newCount;
      });
    }, delay);

    return () => clearInterval(intervalId);
  }, [maxIncrement, delay, stopAt]);

  return (
    <h2>
      {count}
    </h2>
  );
};

export default ElementorCounter;
