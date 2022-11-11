import { useEffect, useState } from "react";

import { convertCurrencies } from "../utils/api";

const Home = () => {
  const [currencyFrom, setCurrencyFrom] = useState("EUR");
  const [currencyTo, setCurrencyTo] = useState("USD");
  const [conversionAmount, setConversionAmount] = useState(1);
  const [convertedResult, setConvertedResult] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const args = {
          amount: conversionAmount,
          from: currencyFrom,
          to: currencyTo,
        };
        const result = await convertCurrencies(args);
        setConvertedResult(result.result);
      } catch (error) {
        alert("Can't fetch Data");
      }
    })();
  }, [conversionAmount, currencyFrom, currencyTo]);

  return (
    <div data-testid="home-page">
      <div>
        <label htmlFor="Amount">Amount</label>
        <input type="number" id="Amount" value={conversionAmount} />
      </div>

      <div>
        <label htmlFor="from">From</label>
        <select data-testid="from" id="from" value={currencyFrom}>
          <option value={currencyFrom}>{currencyFrom}</option>
        </select>
      </div>

      <div>
        <label htmlFor="to">To</label>
        <select data-testid="to" id="to" value={currencyTo}>
          <option value={currencyTo}>{currencyTo}</option>
        </select>
      </div>

      <div data-testid="conversion-result">{convertedResult}</div>

      <button type="button">Swap</button>
      <button type="submit">Convert</button>
    </div>
  );
};

export default Home;
