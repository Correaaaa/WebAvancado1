// components/Button.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeText } from '../store/buttonSlice';
import { RootState } from '../store';

const Button: React.FC = () => {
  const buttonText = useSelector((state: RootState) => state.button.buttonText);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(changeText());
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md sm:w-32 md:w-48 lg:w-64"
    >
      {buttonText}
    </button>
  );
};

export default Button;
