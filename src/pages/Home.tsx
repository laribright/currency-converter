import { useEffect, useCallback } from "react";

import { updateConversionAmount } from "../features/currency";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";

const Home = () => {
  const {
    currency: { conversionAmount, currencyFrom, currencyTo },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  // const onFetchCurrencies = async () => {
  //   const result = await fetchCurrencies();
  //   setCurrencies(Object.keys(result.rates));
  // };

  const onConvertCurrencies = useCallback(async () => {
    // const args = {
    //   amount: conversionAmount,
    //   from: currencyFrom,
    //   to: currencyTo,
    // };
    // const result = await convertCurrencies(args);
    // console.log("Result: ", result)
    // setConvertedResult(result.result);
  }, []);

  useEffect(() => {
    // onConvertCurrencies();
    // onFetchCurrencies();
  }, [onConvertCurrencies]);

  const onSwapClicked = () => {
    // setCurrentCurrencyData((prevState) => ({
    //   ...prevState,
    //   currencyFrom: prevState.currencyTo,
    //   currencyTo: prevState.currencyFrom,
    // }));
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
                // onChange={(e) => setCurrentCurrencyData()}
              >
                <option value={currencyFrom}>{currencyFrom}</option>
                {/* {currencies.length &&
                  currencies.map((currency) => {
                    return (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    );
                  })} */}
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
                // onChange={(e) => setCurrencyTo(e.target.value)}
                className="form-group--select"
                data-testid="to"
                id="to"
                value={currencyTo}
              >
                <option value={currencyTo}>{currencyTo}</option>
                {/* {currencies.length &&
                  currencies.map((currency) => {
                    return (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    );
                  })} */}
              </select>
            </div>
          </div>

          <button type="submit" onClick={onConvertCurrencies} className="btn">
            Convert
          </button>

          <div className="conversion-result--box">
            <div data-testid="conversion-result" className="conversion-result">
              {currencyTo}
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
