import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import styles from './InputQuantity.module.css';

interface Props {
  value: string | number;
  onChangeInput(value: string | number): void;
  onButtonClick(type: string): void;
  onChangeBlur(value: string): void;
  isUpdating?: boolean;
}

const InputQuantity: React.FC<Props> = ({
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
      <div className={styles.qtyContainer}>
        <button
          type="button"
          className={styles.qtyBtn}
          onClick={() => onButtonClick('sub')}
          disabled={isUpdating}
        >
          <FiMinus />
        </button>
        <input
          type="text"
          className={styles.qtyInput}
          value={value}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onBlur={handleOnBlur}
          disabled={isUpdating}
        />
        <button
          type="button"
          className={styles.qtyBtn}
          onClick={() => onButtonClick('add')}
          disabled={isUpdating}
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
};

export default InputQuantity;
