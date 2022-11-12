import { FC } from "react";

interface IConvertedResultProps {
  conversionAmount: number;
  currencyFrom: string;
  amount: number | null;
  currencyTo: string;
}

const ConvertedResultCard: FC<IConvertedResultProps> = (props) => {
  const { conversionAmount, currencyFrom, currencyTo, amount } = props;

  return (
    <div className="converted-result-card">
      {conversionAmount} {currencyFrom} = {amount} {currencyTo}
    </div>
  );
};

export default ConvertedResultCard;
