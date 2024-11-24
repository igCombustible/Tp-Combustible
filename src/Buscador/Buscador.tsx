import React, { ChangeEvent } from 'react';
import './Buscador.css';

interface BuscadorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const Buscador: React.FC<BuscadorProps> = ({ value, onChange, placeholder }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <form className="barra-busqueda">
      <label htmlFor="search">Search</label>
      <input
        required
        pattern=".*\S.*"
        type="search"
        className="input"
        id="search"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      <span className="caret"></span>
    </form>
  );
};





