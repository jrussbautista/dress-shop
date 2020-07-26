import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

interface Props {
  value: string | number;
  onChangeInput(value: string | number): void;
  onButtonClick(type: string): void;
  onChangeBlur(value: string): void;
  isUpdating?: boolean;
}

export const InputQuantity: React.FC<Props> = ({
  value,
  onChangeInput,
  onButtonClick,
  onChangeBlur,
  isUpdating,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChangeInput(value);
  };

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChangeBlur(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isNaN(parseInt(e.key))) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <div className="qty-container">
        <button
          type="button"
          className="qty-btn"
          onClick={() => onButtonClick('sub')}
          disabled={isUpdating}
        >
          <FiMinus />
        </button>
        <input
          type="text"
          className="qty-input"
          value={value}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onBlur={handleOnBlur}
          disabled={isUpdating}
        />
        <button
          type="button"
          className="qty-btn"
          onClick={() => onButtonClick('add')}
          disabled={isUpdating}
        >
          <FiPlus />
        </button>
      </div>
      <style jsx>{`
        .qty-container {
          display: flex;
          border: 1px solid #e6e6e6;
          height: 4rem;
        }

        .qty-input {
          width: 6rem;
          text-align: center;
          font-size: 1.6rem;
          border-left: 1px solid #e6e6e6;
          border-right: 1px solid #e6e6e6;
          border-top: 1px solid transparent;
          border-bottom: 1px solid transparent;
          background-color: #f7f7f7;
        }

        .qty-input:disabled {
          opacity: 0.5;
        }

        .qty-btn {
          background-color: #fff;
          border: 1px solid transparent;
          width: 4rem;
          font-size: 1.6rem;
        }

        .qty-btn:disabled {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};
