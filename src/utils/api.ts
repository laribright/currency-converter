import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_URL } from "./../constants/api";

interface IConvertCurrenciesFn {
  from: string;
  to: string;
  amount: number;
}

// convertCurrencies ACTION
export const convertCurrencies = createAsyncThunk(
  "currencies/convertCurrencies",
  async (args: IConvertCurrenciesFn, thunkApi) => {
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
      const data = await response.json();
      return data.result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// fetchCurrencies ACTION
export const fetchCurrencies = createAsyncThunk(
  "currencies/fetchCurrencies",
  async (args, thunkApi) => {
    const config = {
      method: "GET",
      headers: { apikey: process.env.REACT_APP_API_LAYER_KEY! },
    };

    try {
      const response = await fetch(`${API_URL}/symbols`, config);
      const data = await response.json();
      return data.symbols;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
