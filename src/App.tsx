import { Route, Routes } from "react-router-dom";

import "./styles/main.scss";
import Header from "./components/Header/Header";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
