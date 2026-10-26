import React, { useState } from 'react';
import { blackwoodCase } from './data/cases/blackwoodCase';
import { Character, Clue, GameStage, ViewMode } from './types';
import { Navigation } from './components/Navigation';
import { HostScreen } from './components/HostScreen/HostScreen';
import { PlayerScreen } from './components/PlayerScreen/PlayerScreen';
import { DinnerGuide } from './components/DinnerGuide/DinnerGuide';
import { PrintView } from './components/PrintView/PrintView';
import { RebalanceSimulator } from './components/RebalanceSimulator/RebalanceSimulator';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode | 'rebalance_demo'>('host');
  const [characters, setCharacters] = useState<Character[]>(blackwoodCase.characters);
  const [clues, setClues] = useState<Clue[]>(blackwoodCase.clues);
  const [currentStage, setCurrentStage] = useState<GameStage>('prologue');

  const handleRevealClue = (clueId: string) => {
    setClues((prev) =>
      prev.map((c) => (c.id === clueId ? { ...c, isRevealed: true } : c))
    );
  };

  const handleToggleCharacterStatus = (charId: string) => {
    setCharacters((prev) =>
      prev.map((c) => {
        if (c.id === charId) {
          const nextStatus = c.status === 'active' ? 'absent' : 'active';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const getStageTitle = (stage: GameStage): string => {
    switch (stage) {
      case 'prologue':
        return 'Prolog & Begrüßung';
      case 'round1_reception':
        return 'Runde 1: Empfang (Vorspeise)';
      case 'murder_reveal':
        return '⚡ Mord an Lord Reginald!';
      case 'round2_alibis':
        return 'Runde 2: Kreuzverhör (Hauptgang)';
      case 'round3_climax':
        return 'Runde 3: Finale Indizien (Dessert)';
      case 'accusation':
        return 'Geheime Anklage & Abstimmung';
      case 'epilogue':
        return 'Geständnis & Auflösung';
      default:
        return 'Spiel aktiv';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Navigation Header */}
      <Navigation
        currentView={currentView}
        onSelectView={(v) => setCurrentView(v)}
        activeRoundName={getStageTitle(currentStage)}
      />

      {/* Main View Router */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentView === 'host' && (
          <HostScreen
            mysteryCase={blackwoodCase}
            characters={characters}
            clues={clues}
            currentStage={currentStage}
            onSetStage={setCurrentStage}
            onRevealClue={handleRevealClue}
            onToggleCharacterStatus={handleToggleCharacterStatus}
          />
        )}

        {currentView === 'player' && (
          <PlayerScreen
            characters={characters}
            clues={clues}
            currentStage={currentStage}
          />
        )}

        {currentView === 'dinner' && (
          <DinnerGuide courses={blackwoodCase.dinnerMenu} />
        )}

        {currentView === 'print' && (
          <PrintView mysteryCase={blackwoodCase} characters={characters} />
        )}

        {currentView === 'rebalance_demo' && (
          <RebalanceSimulator
            characters={characters}
            mysteryCase={blackwoodCase}
            onUpdateCharacters={setCharacters}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="no-print border-t border-neutral-900 bg-neutral-950 py-6 text-center text-xs text-neutral-600">
        <p>
          Mysterium Dinner • Hybride Krimi-Dinner Plattform mit integrierter Kulinarik &
          Notfall-Rebalancing
        </p>
      </footer>
    </div>
  );
};
