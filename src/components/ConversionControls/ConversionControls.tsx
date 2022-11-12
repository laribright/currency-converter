import { useLocation } from "react-router-dom";

import {
  convertCurrencies,
  fetchCurrencies,
  onSwapClicked,
  updateConversionAmount,
  updateCurrencyFrom,
  updateCurrencyTo,
} from "../../features/currency";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";

const ConversionControls = () => {
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

  const onConvertClicked = () => {
    dispatch(
      convertCurrencies({
        amount: conversionAmount,
        from: currencyFrom,
        to: currencyTo,
      })
    );
  };

  return (
    <>
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
            disabled={
              location.pathname === "/currency/details" || conversionAmount <= 0
            }
            onChange={(e) => dispatch(updateCurrencyFrom(e.target.value))}
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
          disabled={
            location.pathname === "/currency/details" || conversionAmount <= 0
          }
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
            disabled={conversionAmount <= 0}
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

      <button
        type="submit"
        onClick={onConvertClicked}
        className="btn"
        disabled={conversionAmount <= 0}
      >
        Convert
      </button>
    </>
  );
};

export default ConversionControls;
