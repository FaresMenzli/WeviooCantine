import { Gauge, gaugeClasses } from '@mui/x-charts';
import React, { useState, useEffect } from 'react';

interface ElementorCounterProps {
  initialValue?: number;
  maxIncrement?: number;
  delay?: number;
  stopAt?: number;
  gauge?:boolean;
}

const ElementorCounter: React.FC<ElementorCounterProps> = ({ initialValue = 0, maxIncrement = 10, delay = 1000, stopAt,gauge }) => {
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
    <>

    {gauge?(<>
    
      <Gauge
  value={count}
  startAngle={-110}
  endAngle={110}
  sx={{
    [`& .${gaugeClasses.valueText}`]: {
      fontSize: 18,
      transform: 'translate(0px, 0px)',
    },
  }}
 
  text={
     ({ value }) => `${value} %`
  }
/>
    
    </>):( <h2>
      {count}
    </h2>)}
   
    
    
    
    </>
  );
};

export default ElementorCounter;
