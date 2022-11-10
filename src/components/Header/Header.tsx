import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header" data-testid="header">
      <h2 className="header__logo">Logo</h2>

      <div className="header__navigation-box">
        <Link to="/eur-usd" className="header__navigation-link">
          EUR-USD Details
        </Link>
        <Link to="/eur-gbp" className="header__navigation-link">
          EUR-GBP Details
        </Link>
      </div>
    </header>
  );
};

export default Header;
