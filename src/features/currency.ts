import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ICurrencyState {
  currencyFrom: string;
  currencyTo: string;
  conversionAmount: number;
}

const initialState: ICurrencyState = {
  currencyFrom: "EUR",
  currencyTo: "USD",
  conversionAmount: 1,
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
  },
});

export const { updateConversionAmount, onSwapClicked } = currencySlice.actions;

export default currencySlice.reducer;