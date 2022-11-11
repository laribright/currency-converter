import { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  convertCurrencies,
  fetchCurrencies,
  onSwapClicked,
  updateConversionAmount,
  updateCurrencyFrom,
  updateCurrencyTo,
} from "../features/currency";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";

const Home = () => {
  const {
    currency: {
      conversionAmount,
      currencyFrom,
      currencyTo,
      convertedData: { amount, error, loading: isConverting },
      currencies: { currenciesList, error: fetchCurrenciesError, loading },
    },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const onConvertClicked = () => {
    dispatch(
      convertCurrencies({
        amount: conversionAmount,
        from: currencyFrom,
        to: currencyTo,
      })
    );
  };

  useEffect(() => {
    dispatch(
      convertCurrencies({
        amount: conversionAmount,
        from: currencyFrom,
        to: currencyTo,
      })
    );
    dispatch(fetchCurrencies());
  }, []);

  return (
    <div className="home-page" data-testid="home-page">
      <div className="fixed-home-page">
        <div>
          <h1>Currency Converter</h1>
          <Link className="btn" to="/">Back to Home</Link>
        </div>

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
                onChange={(e) =>
                  dispatch(updateConversionAmount(Number(e.target.value)))
                }
              />
            </div>

            <div className="btn">
              1 {currencyFrom} = 1.2
              {currencyTo}
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
                  onChange={(e) => dispatch(updateCurrencyFrom(e.target.value))}
                >
                  <option value={currencyFrom}>{currencyFrom}</option>
                  {currenciesList.length &&
                    currenciesList.map((currency) => {
                      return (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      );
                    })}
                </select>
              </div>

              <button
                onClick={() => dispatch(onSwapClicked())}
                type="button"
                className="btn"
              >
                Swap
              </button>

              <div className="form-group">
                <label className="form-group--label" htmlFor="to">
                  To
                </label>
                <select
                  onChange={(e) => dispatch(updateCurrencyTo(e.target.value))}
                  className="form-group--select"
                  data-testid="to"
                  id="to"
                  value={currencyTo}
                >
                  <option value={currencyTo}>{currencyTo}</option>
                  {currenciesList.length &&
                    currenciesList.map((currency) => {
                      return (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            <button type="submit" onClick={onConvertClicked} className="btn">
              Convert
            </button>

            <div className="conversion-result--box">
              <div
                data-testid="conversion-result"
                className="conversion-result"
              >
                {isConverting ? "converting..." : `${amount} ${currencyTo}`}
              </div>

              <Link className="conversion-details--link" to="/currency/details">
                More Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
