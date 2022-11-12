import { useAppSelector } from "../../hooks/storeHooks";

const ConversionResult = () => {
  const {
    currency: {
      currencyTo,
      convertedData: { amount, error, loading: isConverting },
    },
  } = useAppSelector((state) => state);

  return (
    <div data-testid="conversion-result" className="conversion-result">
      {isConverting ? "converting..." : `${amount} ${currencyTo}`}
    </div>
  );
};

export default ConversionResult;
