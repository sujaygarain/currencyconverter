


import { useEffect, useState } from "react";

function useCurrencyInfo(baseCurrency) {
  const [data, setData] = useState({ loading: true, data: null, error: null });

  const fetchCurrencyData = async () => {
    if (!baseCurrency) {
      setData({ loading: false, data: null, error: "Currency is not defined" });
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    setData({ loading: true, data: null, error: null });

    try {
      const response = await fetch(`https://api.frankfurter.app/latest?base=${baseCurrency}`, { signal });
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      let result = await response.json();
      result.rates[result.base] = result.amount;
      if (result?.rates) {
        setData({ loading: false, data: result, error: null });
      } else {
        setData({ loading: false, data: null, error: "Invalid response format." });
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setData({ loading: false, data: null, error: error.message });
      }
    }
  };

  useEffect(() => {
    fetchCurrencyData();

    return () => {
      const controller = new AbortController();
      controller.abort();
    };
  }, [baseCurrency]);

  return { ...data };
}

export default useCurrencyInfo;

//2 


// import { useEffect, useState } from "react";

// function useCurrencyInfo(baseCurrency) {
//   const [data, setData] = useState({ loading: true, data: null, error: null });

//   const fetchCurrencyData = async () => {
//     if (!baseCurrency) {
//       setData({ loading: false, data: null, error: "Currency is not defined" });
//       return;
//     }

//     const controller = new AbortController();
//     const { signal } = controller;

//     setData({ loading: true, data: null, error: null });

//     try {
//       const response = await fetch(`https://api.frankfurter.app/latest?base=${baseCurrency}`, { signal });
//       if (!response.ok) {
//         throw new Error(`Error fetching data: ${response.status}`);
//       }

//       const result = await response.json();

//       // Add USD to the rates if it doesn't exist, but do not override user selection
//       if (!result.rates.USD) {
//         result.rates.USD = 1;
//       }

//       setData({ loading: false, data: result, error: null });
//     } catch (error) {
//       if (error.name !== "AbortError") {
//         setData({ loading: false, data: null, error: error.message });
//       }
//     }
//   };

//   useEffect(() => {
//     fetchCurrencyData();

//     return () => {
//       const controller = new AbortController();
//       controller.abort();
//     };
//   }, [baseCurrency]);

//   return { ...data };
// }

// export default useCurrencyInfo;

// 

// import { useEffect, useState } from "react";

// function useCurrencyInfo(baseCurrency = "USD") {
//   const [data, setData] = useState({ loading: true, data: null, error: null });
//   const [selectedCurrency, setSelectedCurrency] = useState(baseCurrency);

//   const fetchCurrencyData = async () => {
//     const controller = new AbortController();
//     const { signal } = controller;

//     setData({ loading: true, data: null, error: null });

//     try {
//     //   const response = await fetch(`https://api.frankfurter.app/latest?base=${selectedCurrency}`, { signal });
//       const response = await fetch(`https://api.frankfurter.app/latest?base=${selectedCurrency}`, { signal });
//       if (!response.ok) {
//         throw new Error(`Error fetching data: ${response.status}`);
//       }

//       const result = await response.json();
//       if (result?.rates) {
//         setData({ loading: false, data: result, error: null });
//       } else {
//         setData({ loading: false, data: null, error: "Invalid response format." });
//       }
//     } catch (error) {
//       if (error.name !== "AbortError") {
//         setData({ loading: false, data: null, error: error.message });
//       }
//     }
//   };

//   useEffect(() => {
//     fetchCurrencyData();

//     return () => {
//       const controller = new AbortController();
//       controller.abort();
//     };
//   }, [selectedCurrency]);

//   return { ...data, selectedCurrency, setSelectedCurrency };
// }

// export default useCurrencyInfo;

