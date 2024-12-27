import React from 'react';
import Select, { SingleValue } from 'react-select';
import { Genre } from '@/types/global';
import { ControllerRenderProps } from 'react-hook-form';

interface GenreSelectProps {
  genresData: Genre[];
  field: ControllerRenderProps<any, 'genreIds'>;
}

const GenreSelect = ({ genresData, field }: GenreSelectProps) => {
  const options = genresData.map((genre) => ({
    value: genre.id,
    label: genre.genreName,
  }));

  const handleChange = (
    selectedOption: SingleValue<{ value: number; label: string }>
  ) => {
    if (selectedOption) {
      field.onChange([...field.value, selectedOption.value]);
    } else {
      field.onChange([]);
    }
  };

  const selectedValue = options.find((option) =>
    field.value.includes(option.value)
  );

  return (
    <Select
      options={options}
      value={selectedValue}
      onChange={handleChange}
      placeholder="Search and select a genre..."
      className=""
      classNamePrefix="select"
    />
  );
};

export default GenreSelect;
