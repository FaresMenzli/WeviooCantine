import React from 'react';
import './NumberInput.css'; 
interface NumberInputProps {
  min?: number;
  value: number;
  onChange: (value: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ min = 0, value, onChange }) => {
  const handleStepUp = () => {
    onChange(value + 1);
  };

  const handleStepDown = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="number-input">
      <button onClick={handleStepDown} className="minus">
        <i className="fas fa-minus"></i>
      </button>
      <input
        className="quantity"
        min={min}
        name="quantity"
        value={value}
        type="text"
        onChange={handleChange}
      />
      <button onClick={handleStepUp} className="plus">
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default NumberInput;
