const Home = () => {
  return (
    <div data-testid="home-page">
      <div>
        <label htmlFor="Amount">Amount</label>
        <input type="number" id="Amount" />
      </div>

      <div>
        <label htmlFor="from">From</label>
        <select data-testid="from" id="from" value={"EUR"}>
          <option value="EUR">EUR</option>
        </select>
      </div>

      <button type="button">Swap</button>
      <button type="submit">Convert</button>
    </div>
  );
};

export default Home;
