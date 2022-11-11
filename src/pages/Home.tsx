import { useEffect, useState } from "react";

import { convertCurrencies } from "../utils/api";

const Home = () => {
  const [currencyFrom, setCurrencyFrom] = useState("EUR");
  const [currencyTo, setCurrencyTo] = useState("USD");
  const [conversionAmount, setConversionAmount] = useState(1);
  const [convertedResult, setConvertedResult] = useState("1.2");

  useEffect(() => {
    // (async () => {
    //   try {
    //     const args = {
    //       amount: conversionAmount,
    //       from: currencyFrom,
    //       to: currencyTo,
    //     };
    //     const result = await convertCurrencies(args);
    //     setConvertedResult(result.result);
    //   } catch (error) {
    //     alert("Can't fetch Data");
    //   }
    // })();
  }, [conversionAmount, currencyFrom, currencyTo]);

  const onSwapClicked = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
  };

  return (
    <div className="home-page" data-testid="home-page">
      <div className="currency-box--controls">
        <div className="left-pane">
          <div className="form-group">
            <label className="form-group--label" htmlFor="Amount">
              Amount
            </label>
            <input
              className="input"
              type="number"
              id="Amount"
              value={conversionAmount}
            />
          </div>

          <div className="btn">
            1 {currencyFrom} = 1.2 {currencyTo}
          </div>
        </div>

        <div className="conversion-controls">
          <div className="conversion-controls__select">
            <div className="form-group">
              <label className="form-group--label" htmlFor="from">
                From
              </label>
              <select
                className="form-group--select"
                data-testid="from"
                id="from"
                value={currencyFrom}
              >
                <option value={currencyFrom}>{currencyFrom}</option>
              </select>
            </div>

            <button onClick={onSwapClicked} type="button" className="btn">
              Swap
            </button>

            <div className="form-group">
              <label className="form-group--label" htmlFor="to">
                To
              </label>
              <select
                className="form-group--select"
                data-testid="to"
                id="to"
                value={currencyTo}
              >
                <option value={currencyTo}>{currencyTo}</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn">
            Convert
          </button>

          <div className="conversion-result--box">
            <div data-testid="conversion-result" className="conversion-result">
              {convertedResult} {currencyTo}
            </div>

            <a className="conversion-details--link" href="#!">
              More Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
