import React from 'react';
import { ViewMode } from '../types';
import { Tv, Smartphone, Utensils, Printer, ShieldAlert } from 'lucide-react';

interface NavigationProps {
  currentView: ViewMode | 'rebalance_demo';
  onSelectView: (view: ViewMode | 'rebalance_demo') => void;
  activeRoundName: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onSelectView,
  activeRoundName
}) => {
  const navItems = [
    {
      id: 'host',
      label: 'Host-Zentrale (TV / Tablet)',
      icon: Tv,
      desc: 'Zentraler Tisch-Screen, Atmosphäre & Ablauf'
    },
    {
      id: 'player',
      label: 'Spieler-Smartphone',
      icon: Smartphone,
      desc: 'Persönliches Rollenheft & geheime Missionen'
    },
    {
      id: 'dinner',
      label: 'Dinner & Kulinarik',
      icon: Utensils,
      desc: '3-Gänge-Menü, Rezepte & stressfreies Timing'
    },
    {
      id: 'print',
      label: 'Druckvorlagen (PDF / Analog)',
      icon: Printer,
      desc: 'Rollenhefte & Material zum Ausdrucken'
    },
    {
      id: 'rebalance_demo',
      label: 'Notfall: Spieler krank / fehlt',
      icon: ShieldAlert,
      badge: 'Live-Rettung',
      desc: 'Dynamischer Ausfallschutz & Rebalancing'
    }
  ];

  return (
    <header className="no-print bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">🕯️</span>
            <div>
              <span className="font-serif-title text-amber-500 font-bold tracking-wider text-base sm:text-lg block">
                MYSTERIUM DINNER
              </span>
              <span className="text-xs text-neutral-400 font-mono hidden sm:inline-block">
                Schloss Blackwood • {activeRoundName}
              </span>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id as ViewMode | 'rebalance_demo')}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-600/20 text-amber-400 border border-amber-500/40 shadow-sm shadow-amber-900/20'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
                  }`}
                  title={item.desc}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                  {item.badge && (
                    <span className="bg-rose-500/30 text-rose-300 text-[10px] px-1.5 py-0.5 rounded-full font-mono border border-rose-500/40 hidden lg:inline">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
