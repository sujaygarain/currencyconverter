
import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD"); 
  const [to, setTo] = useState("INR"); 
  const [convertedAmount, setConvertedAmount] = useState(0);

  const { data: currencyInfo, loading, error, setBaseCurrency } = useCurrencyInfo(from);

  // Fetch options from rates
  const options = currencyInfo?.rates ? Object.keys(currencyInfo.rates) : [];

  // Swap currencies
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(0);
    setBaseCurrency(to); // Update the API to reflect the swapped base currency
  };

  // Convert amount
  const convert = () => {
    if (currencyInfo?.rates && currencyInfo.rates[to]) {
      setConvertedAmount((amount * currencyInfo.rates[to]).toFixed(2));
    } else {
      alert("Conversion rate not available.");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 via-gray-900 to-gray-700 text-white">
      <div className="w-full max-w-md mx-auto border border-gray-800 rounded-lg p-6 shadow-lg backdrop-blur-sm bg-white/20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="w-full mb-4">
            {!loading && options.length > 0 && (
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => {
                  setFrom(currency);
                  setBaseCurrency(currency); // Ensure the API fetch updates
                  setConvertedAmount(0);
                }}
                selectCurrency={from}
                onAmountChange={(value) => setAmount(value)}
              />
            )}
          </div>
          <div className="relative w-full mb-4">
            <button
              type="button"
              className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition duration-300"
              onClick={swap}
            >
              Swap
            </button>
          </div>
          <div className="w-full mb-4">
            {!loading && options.length > 0 && (
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => {
                  setTo(currency);
                  setConvertedAmount(0);
                }}
                selectCurrency={to}
                amountDisable
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default App;
