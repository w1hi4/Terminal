import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, DollarSign, RefreshCw, BarChart3 } from 'lucide-react';

const CryptoTracker: React.FC = () => {
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,cardano,polkadot&order=market_cap_desc&per_page=5&page=1&sparkline=true&price_change_percentage=24h');
      const data = await res.json();
      setPrices(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Crypto fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // 1 minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full bg-[#050505] text-white p-6 font-sans overflow-y-auto selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Market Pulse</h1>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Real-time Digital Assets</p>
            </div>
          </div>
          <button 
            onClick={fetchPrices}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            Sync
          </button>
        </header>

        {loading && prices.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
            <p className="text-sm font-bold tracking-widest uppercase opacity-40">Connecting to CEX APIs...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {prices.map((coin, i) => (
              <motion.div 
                key={coin.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between hover:bg-white/10 hover:border-white/20 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-bold text-white">{coin.name}</div>
                    <div className="text-xs text-white/40 uppercase font-bold">{coin.symbol}</div>
                  </div>
                </div>

                <div className="flex-1 px-8 hidden md:block">
                  <div className="h-10 w-full opacity-60">
                    <svg viewBox="0 0 100 20" className="h-full w-full">
                      <polyline
                        fill="none"
                        stroke={coin.price_change_percentage_24h >= 0 ? "#4ade80" : "#f87171"}
                        strokeWidth="2"
                        points={coin.sparkline_in_7d.price.slice(-20).map((p: number, idx: number) => {
                          const min = Math.min(...coin.sparkline_in_7d.price.slice(-20));
                          const max = Math.max(...coin.sparkline_in_7d.price.slice(-20));
                          const y = (p - min) / (max - min) * 20;
                          return `${idx * 5},${20 - y}`;
                        }).join(' ')}
                      />
                    </svg>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="text-lg font-bold">${coin.current_price.toLocaleString()}</div>
                  <div className={`text-xs flex items-center justify-end gap-1 font-bold ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {coin.price_change_percentage_24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <footer className="flex items-center justify-between text-[10px] text-white/20 uppercase tracking-widest font-bold pt-8">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-3 h-3" />
            Market is Open
          </div>
          <div>Last update: {lastUpdated.toLocaleTimeString()}</div>
        </footer>
      </div>
    </div>
  );
};

export default CryptoTracker;
