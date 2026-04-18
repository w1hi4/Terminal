import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, Activity, Globe, Wifi } from 'lucide-react';

const SystemMonitor: React.FC = () => {
  const [cpuUsage, setCpuUsage] = useState<number[]>(Array(20).fill(0));
  const [ramUsage, setRamUsage] = useState<number[]>(Array(20).fill(0));
  const [networkUsage, setNetworkUsage] = useState<number[]>(Array(20).fill(0));
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => [...prev.slice(1), Math.floor(Math.random() * 30) + 10]);
      setRamUsage(prev => [...prev.slice(1), Math.floor(Math.random() * 20) + 40]);
      setNetworkUsage(prev => [...prev.slice(1), Math.floor(Math.random() * 80)]);
      setUptime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const BarChart = ({ data, color, max = 100 }: { data: number[], color: string, max?: number }) => (
    <div className="flex items-end gap-1 h-24 w-full bg-black/40 rounded-lg p-2 overflow-hidden border border-white/5">
    {data.map((val, i) => (
      <motion.div
        key={`${color}-${i}`}
          initial={{ height: 0 }}
          animate={{ height: `${(val / max) * 100}%` }}
          className={`w-full rounded-t-sm ${color}`}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      ))}
    </div>
  );

  return (
    <div className="h-full w-full bg-[#0a0a0a] text-white/80 p-6 font-mono overflow-y-auto selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/5 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-blue-400">
              <Cpu className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold tracking-widest">CPU Load</span>
            </div>
            <div className="text-2xl font-bold">{cpuUsage[cpuUsage.length - 1]}%</div>
            <div className="text-[10px] text-white/40">Intel Core i9-13900K</div>
          </div>
          <div className="bg-white/5 border border-white/5 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-green-400">
              <Zap className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Memory</span>
            </div>
            <div className="text-2xl font-bold">{ramUsage[ramUsage.length - 1]}%</div>
            <div className="text-[10px] text-white/40">32GB DDR5 @ 6000MT/s</div>
          </div>
          <div className="bg-white/5 border border-white/5 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-purple-400">
              <Wifi className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Network</span>
            </div>
            <div className="text-2xl font-bold">{networkUsage[networkUsage.length - 1]} Mbps</div>
            <div className="text-[10px] text-white/40">Latency: 12ms</div>
          </div>
          <div className="bg-white/5 border border-white/5 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-orange-400">
              <Activity className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Uptime</span>
            </div>
            <div className="text-2xl font-bold font-mono">{formatUptime(uptime)}</div>
            <div className="text-[10px] text-white/40">Kernel: bl4ck30x-v1</div>
          </div>
        </div>

        {/* Real-time Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-blue-400">
              Processor Frequency
            </h3>
            <BarChart data={cpuUsage} color="bg-blue-500" max={100} />
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-green-400">
              Memory Allocation
            </h3>
            <BarChart data={ramUsage} color="bg-green-500" max={100} />
          </div>
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-purple-400">
              Inbound Traffic
            </h3>
            <BarChart data={networkUsage} color="bg-purple-500" max={100} />
          </div>
        </div>

        {/* Process List */}
        <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
          <div className="bg-white/5 px-4 py-2 border-b border-white/5 text-[10px] uppercase font-bold tracking-widest text-white/40 flex justify-between">
            <span>Active Processes</span>
            <span>Usage</span>
          </div>
          <div className="divide-y divide-white/5">
            {[
              { id: 'kernel', name: 'kernel_task', cpu: '1.2%', ram: '2.4GB' },
              { id: 'chrome', name: 'Chromium', cpu: '8.4%', ram: '1.8GB' },
              { id: 'term', name: 'Terminal', cpu: '0.4%', ram: '124MB' },
              { id: 'win', name: 'WindowServer', cpu: '4.2%', ram: '512MB' },
              { id: 'engine', name: 'bl4ck30x_engine', cpu: '0.8%', ram: '256MB' },
            ].map((p) => (
              <div key={p.id} className="px-4 py-3 flex items-center justify-between text-xs hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-bold">{p.name}</span>
                </div>
                <div className="flex gap-4 text-white/40">
                  <span>{p.cpu}</span>
                  <span className="w-16 text-right">{p.ram}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;
