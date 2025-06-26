import React from 'react';
import FinalSlider from './FinalSlider';

interface SimpleSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  unit: string;
  label: string;
}

const SimpleSlider: React.FC<SimpleSliderProps> = ({ min, max, value, onChange, unit, label }) => {
  return (
    <FinalSlider
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      unit={unit}
      label={label}
    />
  );
};

export default SimpleSlider;