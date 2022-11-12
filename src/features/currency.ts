import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { convertCurrencies, fetchCurrencies } from "../utils/api";

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
    currenciesList: any;
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
    currenciesList: {},
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
      (state, action: PayloadAction<object>) => {
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
