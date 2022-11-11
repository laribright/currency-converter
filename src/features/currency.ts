import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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
      const response = await fetch(`${API_URL}/latest`, config);
      const data = await response.json();
      return Object.keys(data.rates);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export interface ICurrencyState {
  currencyFrom: string;
  currencyTo: string;
  conversionAmount: number;
  convertedData: {
    amount: null | number;
    loading: boolean;
    error: null | string;
  };
  currencies: {
    loading: boolean;
    currenciesList: string[];
    error: null | string;
  };
}

const initialState: ICurrencyState = {
  currencyFrom: "EUR",
  currencyTo: "USD",
  conversionAmount: 1,
  convertedData: {
    amount: null,
    error: null,
    loading: false,
  },
  currencies: {
    loading: false,
    currenciesList: [],
    error: null,
  },
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    updateConversionAmount: (state, action: PayloadAction<number>) => {
      return { ...state, conversionAmount: action.payload };
    },
    onSwapClicked: (state) => {
      return {
        ...state,
        currencyFrom: state.currencyTo,
        currencyTo: state.currencyFrom,
      };
    },
    updateCurrencyFrom: (state, action: PayloadAction<string>) => {
      return { ...state, currencyFrom: action.payload };
    },
    updateCurrencyTo: (state, action: PayloadAction<string>) => {
      return { ...state, currencyTo: action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(convertCurrencies.pending, (state) => {
      state.convertedData.loading = true;
    });
    builder.addCase(
      convertCurrencies.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.convertedData.loading = false;
        state.convertedData.amount = action.payload;
      }
    );
    builder.addCase(
      convertCurrencies.rejected,
      (state, action: PayloadAction<any>) => {
        state.convertedData.loading = false;
        state.convertedData.error = action.payload;
      }
    );
    builder.addCase(fetchCurrencies.pending, (state) => {
      state.currencies.loading = true;
    });
    builder.addCase(
      fetchCurrencies.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.currencies.loading = false;
        state.currencies.currenciesList = action.payload;
      }
    );
    builder.addCase(
      fetchCurrencies.rejected,
      (state, action: PayloadAction<any>) => {
        state.convertedData.loading = false;
        state.convertedData.error = action.payload;
      }
    );
  },
});

export const {
  updateConversionAmount,
  onSwapClicked,
  updateCurrencyFrom,
  updateCurrencyTo,
} = currencySlice.actions;

export default currencySlice.reducer;
