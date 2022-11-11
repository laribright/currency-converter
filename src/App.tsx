import { Route, Routes } from "react-router-dom";

import "./styles/main.scss";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";
import CurrencyDetails from "./pages/CurrencyDetails";

function App() {
  return (
    <>
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/currency/details" element={<CurrencyDetails />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
