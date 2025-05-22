import { useState, useEffect } from 'react';
import './App.css';

const mockRates = {
  usd: { name: "US Dollar", rate: 1 },
  eur: { name: "Euro", rate: 0.85 },
  gbp: { name: "British Pound", rate: 0.73 },
  aed: { name: "Emirati Dirham", rate: 3.67 },
  irr: { name: "Iranian Rial", rate: 820000 },
  try: { name: "Turkish Lira", rate: 13.5 },
  cny: { name: "Chinese Yuan", rate: 6.45 },
};

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState<keyof typeof mockRates>('usd');
  const [toCurrency, setToCurrency] = useState<keyof typeof mockRates>('irr');
  const [result, setResult] = useState(0);

  // Universal conversion function
  const convertCurrency = (amount: number, from: keyof typeof mockRates, to: keyof typeof mockRates): number => {
    // Convert to USD first, then to target currency
    const amountInUSD = amount / mockRates[from].rate;
    return amountInUSD * mockRates[to].rate;
  };

  useEffect(() => {
    setResult(convertCurrency(amount, fromCurrency, toCurrency));
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="app">
      <h1>Universal Currency Converter</h1>
      <div className="converter-box">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
          min="0"
        />
        
        <div className="currency-selectors">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value as keyof typeof mockRates)}
          >
            {Object.keys(mockRates).map((currency) => (
              <option key={`from-${currency}`} value={currency}>
                {mockRates[currency as keyof typeof mockRates].name} ({currency.toUpperCase()})
              </option>
            ))}
          </select>

          <span className="arrow">→</span>

          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value as keyof typeof mockRates)}
          >
            {Object.keys(mockRates).map((currency) => (
              <option key={`to-${currency}`} value={currency}>
                {mockRates[currency as keyof typeof mockRates].name} ({currency.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        <div className="result">
          {amount} {fromCurrency.toUpperCase()} = 
          <strong> {result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurrency.toUpperCase()}</strong>
        </div>
      </div>
    </div>
  );
}

export default App;