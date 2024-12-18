
/* eslint-disable react/prop-types */

import { useId } from 'react';

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency,
  amountDisable = false,
  currencyDisable = false,
  className = '',
}) {
  const amountInputId = useId();

  return (
    <div className={`bg-gray-800 p-6 rounded-lg text-sm flex flex-col ${className} text-white`}>
      <label htmlFor={amountInputId} className="text-gray-300 mb-2">
        {label}
      </label>
      <div className="flex items-center space-x-4">
        <input
          id={amountInputId}
          className="flex-1 outline-none bg-transparent py-2 px-4 text-white placeholder-gray-400 border border-gray-600 rounded-lg"
          type="number"
          placeholder="Enter amount"
          disabled={amountDisable}
          min="0"
          value={amount || ''} // Clear input when amount is null
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
        />
        <select
          className="bg-gray-700 text-white rounded-lg px-4 py-2 outline-none border border-gray-600 cursor-pointer"
          value={selectCurrency}
          disabled={currencyDisable}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
        >
          <option value="" disabled>
            Select
          </option>
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
