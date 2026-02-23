import React, { useState } from 'react';
import TradeAnalyzer from './components/TradeAnalyzer';

const NAV_ITEMS = [
  { id: 'trade', label: 'Trade Analyzer' },
  // Future features will be added here
];

export default function App() {
  const [activeTab, setActiveTab] = useState('trade');

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center gap-6 h-14">
          {/* Logo */}
          <span className="text-white font-black text-xl tracking-tight select-none">
            PFF<span className="text-blue-500">.</span>
          </span>

          {/* Nav tabs */}
          <div className="flex gap-1">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1">
        {activeTab === 'trade' && <TradeAnalyzer />}
      </main>
    </div>
  );
}
