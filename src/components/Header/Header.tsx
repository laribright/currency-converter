import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header role="navigation">
      <h2>Logo</h2>

      <Link to="/eur-usd">EUR-USD Details</Link>
      <Link to="/eur-gbp">EUR-GBP Details</Link>
    </header>
  );
};

export default Header;
