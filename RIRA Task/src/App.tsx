import { useState, useEffect } from 'react';

const mockRates = {
  usd: { name: "US Dollar", rate: 1 },
  eur: { name: "Euro", rate: 0.85 },
  gbp: { name: "British Pound", rate: 0.73 },
  aed: { name: "Emirati Dirham", rate: 3.67 },
  irr: { name: "Iranian Rial", rate: 820000 },
  try: { name: "Turkish Lira", rate: 38.92 },
  cny: { name: "Chinese Yuan", rate: 6.45 },
};

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState<keyof typeof mockRates>('usd');
  const [toCurrency, setToCurrency] = useState<keyof typeof mockRates>('irr');
  const [result, setResult] = useState(0);

  const convertCurrency = (amount: number, from: keyof typeof mockRates, to: keyof typeof mockRates): number => {
    const amountInUSD = amount / mockRates[from].rate;
    return amountInUSD * mockRates[to].rate;
  };

  useEffect(() => {
    setResult(convertCurrency(amount, fromCurrency, toCurrency));
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[url(./c8fe8007fca038f9080fee703c4cb495.jpg)] bg-cover bg-no-repeat before:content-[''] before:absolute before:w-full before:h-screen before:backdrop-blur-[30px]">
      <div className="backdrop-blur-[70px] bg-white/30 rounded-lg shadow-lg p-8">
      <h1 className='font-bold text-black mb-7'>Universal Currency Converter</h1>
      <div className="flex justify-center items-center flex-col gap-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
          min="0"
          className='outline-2 text-black px-2'
        />
        
        <div className=" text-black flex gap-4">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value as keyof typeof mockRates)}
            className='border-2'
          >
            {Object.keys(mockRates).map((currency) => (
              <option key={`from-${currency}`} value={currency}>
                {mockRates[currency as keyof typeof mockRates].name} ({currency.toUpperCase()})
              </option>
            ))}
          </select>

          <span className="">To</span>

          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value as keyof typeof mockRates)}
            className='border-2'
          >
            {Object.keys(mockRates).map((currency) => (
              <option key={`to-${currency}`} value={currency}>
                {mockRates[currency as keyof typeof mockRates].name} ({currency.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        <div className="font-bold text-green-950 text-3xl">
          {amount} {fromCurrency.toUpperCase()} = 
          <strong> {result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurrency.toUpperCase()}</strong>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;