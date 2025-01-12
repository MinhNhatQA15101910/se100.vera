import React from 'react';
import Select, { SingleValue } from 'react-select';
import { Gender } from '@/types/global';
import { ControllerRenderProps } from 'react-hook-form';

interface GenderSelectProps {
  field: ControllerRenderProps<any, 'gender'>;
}

const GenderSelect = ({ field }: GenderSelectProps) => {
  const options = Object.values(Gender).map((gender) => ({
    value: gender,
    label: gender.charAt(0).toUpperCase() + gender.slice(1),
  }));

  const handleChange = (
    selectedOption: SingleValue<{ value: Gender; label: string }>
  ) => {
    if (selectedOption) {
      field.onChange(selectedOption.value);
    } else {
      field.onChange(null);
    }
  };

  const selectedValue = options.find((option) => option.value === field.value);

  return (
    <Select
      options={options}
      value={selectedValue}
      onChange={handleChange}
      placeholder="Select gender"
      className=""
      classNamePrefix="select"
    />
  );
};

export default GenderSelect;
