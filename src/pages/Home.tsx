const Home = () => {
  return (
    <div data-testid="home-page">
      <div>
        <label htmlFor="Amount">Amount</label>
        <input type="number" id="Amount" />
      </div>

      <button type="button">Swap</button>
      <button type="submit">Convert</button>
    </div>
  );
};

export default Home;
