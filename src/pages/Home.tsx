import { useAppSelector } from "../hooks/storeHooks";

const Home = () => {
  const CONVERSION_RESULT = new Array(9).fill(2);

  const {
    currency: {
      convertedData: { amount },
      currencyFrom,
      currencyTo,
      conversionAmount,
    },
  } = useAppSelector((state) => state);

  return (
    <div className="home-page" data-testid="home-page">
      <div className="grid-display">
        {CONVERSION_RESULT.map((result, idx) => {
          return (
            <div key={idx} className="converted-result-card">
              {conversionAmount} {currencyFrom} = {amount} {currencyTo}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
