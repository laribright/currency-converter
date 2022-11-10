export const fetchCurrencies = async () => {
  try {
    const response = await fetch(
      `https://data.fixer.io/api/symbols?access_key=${process.env.REACT_APP_API_LAYER_KEY}`
    );
    return await response.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
