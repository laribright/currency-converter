import { FC, memo, ReactNode, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  convertCurrencies,
  fetchCurrencies,
  updateConversionAmount,
} from "../../features/currency";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import ConversionControls from "../ConversionControls/ConversionControls";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = (props) => {
  const { children } = props;

  const location = useLocation();
  const dispatch = useAppDispatch();

  const {
    currency: {
      conversionAmount,
      currencyFrom,
      currencyTo,
      convertedData: { amount, error, loading: isConverting },
      currencies: { currenciesList, error: fetchCurrenciesError, loading },
    },
  } = useAppSelector((state) => state);

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
                {conversionAmount} {currencyFrom} = {amount} {currencyTo}
              </div>
            </div>

            <div className="conversion-controls">
              <ConversionControls />

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
