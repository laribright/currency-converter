import { API_URL } from "./../constants/api";

export const fetchCurrencies = async () => {
  const config = {
    method: "GET",
    headers: { apikey: process.env.REACT_APP_API_LAYER_KEY! },
  };

  try {
    const response = await fetch(`${API_URL}/latest`, config);
    return response.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

interface IConvertCurrenciesFn {
  from: string;
  to: string;
  amount: number;
}

export const convertCurrencies = async (args: IConvertCurrenciesFn) => {
  const { from, to, amount } = args;

  const config = {
    method: "GET",
    headers: { apikey: process.env.REACT_APP_API_LAYER_KEY! },
  };

  try {
    const response = await fetch(
      `${API_URL}/convert?to=${to}&from=${from}&amount=${amount}`,
      config
    );
    return response.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
