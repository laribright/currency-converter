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
  return <div></div>;
};

export default Home;
