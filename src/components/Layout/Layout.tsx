import { FC, memo, ReactNode, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  convertCurrencies,
  fetchCurrencies,
  onSwapClicked,
  updateConversionAmount,
  updateCurrencyFrom,
  updateCurrencyTo,
} from "../../features/currency";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = (props) => {
  const { children } = props;

  const location = useLocation();

  console.log(location);

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

  console.log(currenciesList);

  return (
    <main className="layout">
      <div className="home-page" data-testid="home-page">
        <div className="fixed-home-page">
          <div className="flex">
            {location.pathname === "/currency/details" ? (
              <h1>
                {currencyFrom} - {currenciesList[currencyFrom]}
              </h1>
            ) : (
              <h1>Currency Exchanger</h1>
            )}
            {location.pathname === "/currency/details" && (
              <Link className="btn" to="/">
                Back to Home
              </Link>
            )}
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
                    disabled={location.pathname === "/currency/details"}
                    onChange={(e) =>
                      dispatch(updateCurrencyFrom(e.target.value))
                    }
                  >
                    <option value={currencyFrom}>{currencyFrom}</option>
                    {Object.keys(currenciesList).length &&
                      Object.keys(currenciesList).map((currency) => {
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
                  disabled={location.pathname === "/currency/details"}
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
                    {Object.keys(currenciesList).length &&
                      Object.keys(currenciesList).map((currency) => {
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

                {location.pathname !== "/currency/details" && (
                  <Link
                    className="conversion-details--link"
                    to="/currency/details"
                  >
                    More Details
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {children}
    </main>
  );
};

export default memo(Layout);
