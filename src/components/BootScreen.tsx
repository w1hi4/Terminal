import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const BOOT_LOGS = [
  "[  OK  ] Started Load Kernel Modules.",
  "[  OK  ] Started Mount points for w1hi4 OS.",
  "[  OK  ] Reached target Local File Systems.",
  "Initializing w1hi4-kernel-v5.15.0-kali...",
  "Checking hardware compatibility...",
  "CPU: Intel(R) Core(TM) i9-12900K @ 5.2GHz",
  "Memory: 64GB DDR5 6000MHz detected.",
  "Storage: NVMe Gen4 SSD 2TB mounted at /",
  "Network: wlan0 connected to 'W1HI4_SECURE_NET'",
  "Security: SELinux initialized in enforcing mode.",
  "Loading graphics drivers... [DONE]",
  "Starting System Message Bus...",
  "Starting User Login Management Service...",
  "Starting Network Manager...",
  "Starting w1hi4 Desktop Environment...",
  "Welcome to w1hi4 OS v1.0.0",
];

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < BOOT_LOGS.length) {
      const timeout = setTimeout(() => {
        setLogs(prev => [...prev, BOOT_LOGS[index]]);
        setIndex(prev => prev + 1);
      }, Math.random() * 200 + 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(onComplete, 1000);
      return () => clearTimeout(timeout);
    }
  }, [index, onComplete]);

  return (
    <div className="fixed inset-0 bg-black text-[#00ff00] font-mono p-8 overflow-hidden z-[1000]">
      <div className="max-w-4xl mx-auto">
        {logs.map((log, i) => (
          <div key={i} className="mb-1 text-xs md:text-sm">
            <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
            {log}
          </div>
        ))}
        <div className="mt-4 animate-pulse">_</div>
      </div>
    </div>
  );
};

export default BootScreen;
