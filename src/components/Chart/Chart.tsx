import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { options, data } from "../../data/chart";
import { useAppSelector } from "../../hooks/storeHooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const { currencyTo } = useAppSelector((state) => state.currency);

  return <Bar options={options} data={data(currencyTo)} />;
};

export default Chart;
