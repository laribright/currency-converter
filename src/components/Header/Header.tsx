import { Link, useNavigate } from "react-router-dom";

import { updateCurrencyFrom, updateCurrencyTo } from "../../features/currency";
import { useAppDispatch } from "../../hooks/storeHooks";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onNavigate = (param: string) => {
    const currencyFrom = param.split("-")[0].toUpperCase();
    const currencyTo = param.split("-")[1].toUpperCase();

    dispatch(updateCurrencyFrom(currencyFrom));
    dispatch(updateCurrencyTo(currencyTo));

    navigate("/currency/details");
  };

  return (
    <header className="header" data-testid="header">
      <h2 className="header__logo">Logo</h2>

      <div className="header__navigation-box">
        <button
          onClick={() => onNavigate("eur-usd")}
          className="header__navigation-link"
        >
          EUR-USD Details
        </button>
        <button
          onClick={() => onNavigate("eur-gbp")}
          className="header__navigation-link"
        >
          EUR-GBP Details
        </button>
      </div>
    </header>
  );
};

export default Header;
