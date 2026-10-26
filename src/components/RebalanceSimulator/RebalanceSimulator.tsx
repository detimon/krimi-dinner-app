import React, { useState } from 'react';
import { Character, MysteryCase } from '../../types';
import {
  ShieldAlert,
  UserX,
  Clock,
  ArrowRight,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  FileText
} from 'lucide-react';

interface RebalanceSimulatorProps {
  characters: Character[];
  mysteryCase: MysteryCase;
  onUpdateCharacters: (updated: Character[]) => void;
}

export const RebalanceSimulator: React.FC<RebalanceSimulatorProps> = ({
  characters,
  mysteryCase,
  onUpdateCharacters
}) => {
  // Local simulated state
  const [activeCharacters, setActiveCharacters] = useState<Character[]>(characters);
  const [rebalanceLog, setRebalanceLog] = useState<string[]>([
    'System bereit. Alle 6 Charaktere sind voll einsatzbereit.',
    'Kernelement: Mindestens 4 Spieler erforderlich, 2 modulare Rollen können gefahrlos entfallen.'
  ]);

  const addLog = (msg: string) => {
    setRebalanceLog((prev) => [msg, ...prev]);
  };

  // Mark character as sick / absent
  const handleMarkSick = (charId: string) => {
    const target = activeCharacters.find((c) => c.id === charId);
    if (!target) return;

    if (target.isMurderer) {
      // Emergency: The killer is absent! Reallocate killer role to Dr. Hastings or Eleanor
      const fallbackKiller = activeCharacters.find((c) => c.id !== charId && c.isCore);
      if (!fallbackKiller) return;

      const updated = activeCharacters.map((c) => {
        if (c.id === charId) {
          return { ...c, status: 'absent' as const, isMurderer: false };
        }
        if (c.id === fallbackKiller.id) {
          return {
            ...c,
            isMurderer: true,
            secretBackstory: `${c.secretBackstory} [NOTFALL-REBALANCE]: Da James fehlte, hast DU Reginald das Gift in den Sherry gemischt, um dein Ultimatum abzuwenden!`
          };
        }
        return c;
      });

      setActiveCharacters(updated);
      onUpdateCharacters(updated);
      addLog(
        `🚨 NOTFALL-RETTUNG: ${target.name} (der ursprüngliche Mörder) ist krank! Das System hat die Mörder-Rolle nahtlos auf ${fallbackKiller.name} übertragen. Schlüsselhinweise wurden neu verknüpft!`
      );
      addLog(
        `📄 ${target.name} hinterlässt einen Abschiedsbrief, der als physischer Hinweis im Raum gefunden wird.`
      );
    } else {
      // Normal guest absent
      const updated = activeCharacters.map((c) =>
        c.id === charId ? { ...c, status: 'absent' as const } : c
      );
      setActiveCharacters(updated);
      onUpdateCharacters(updated);
      addLog(
        `⚠️ ${target.name} wurde als 'Krank / Abwesend' markiert. Die Rolle wird zum NPC: Ein Dokument/Brief mit ihren Zeugenaussagen wird automatisch generiert!`
      );
    }
  };

  // Mark character as arriving late
  const handleMarkLate = (charId: string) => {
    const target = activeCharacters.find((c) => c.id === charId);
    if (!target) return;

    const updated = activeCharacters.map((c) =>
      c.id === charId ? { ...c, status: 'arriving_late' as const } : c
    );
    setActiveCharacters(updated);
    onUpdateCharacters(updated);
    addLog(
      `⏱️ ${target.name} kommt verspätet: Die Geschichte passt sich an („Wagen steckte im Schneesturm fest“). Die Figur betritt die Tafel erst zu Gang 2 (Hauptgang)!`
    );
  };

  // Mark character as leaving early
  const handleMarkEarlyLeave = (charId: string) => {
    const target = activeCharacters.find((c) => c.id === charId);
    if (!target) return;

    const updated = activeCharacters.map((c) =>
      c.id === charId ? { ...c, status: 'leaving_early' as const } : c
    );
    setActiveCharacters(updated);
    onUpdateCharacters(updated);
    addLog(
      `🚪 ${target.name} muss früher gehen: Die Figur verlässt den Speisesaal nach Gang 2 („Muss dringend einen Zug erwischen / Unwohlsein“). Ihre geheimen Schlussinfos werden vorab übergeben!`
    );
  };

  // Reset to original
  const handleReset = () => {
    setActiveCharacters(mysteryCase.characters);
    onUpdateCharacters(mysteryCase.characters);
    setRebalanceLog(['System auf Werkseinstellung für alle 6 Charaktere zurückgesetzt.']);
  };

  const currentKiller = activeCharacters.find((c) => c.isMurderer);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-rose-950/40 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-3 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-rose-500/10 text-rose-400 rounded-lg">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">
              AUSFALLSCHUTZ & DYNAMISCHES REBALANCING
            </span>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Zurücksetzen</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold font-serif-title text-neutral-100">
          Notfall-Simulator: Spieler krank, zu spät oder früher weg?
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl font-story leading-relaxed">
          Das gefürchtetste Problem bei Krimi-Dinnern gelöst: Teste hier live, wie die Story und
          die Rollen automatisch umgestellt werden, ohne dass der Abend abgesagt werden muss!
        </p>
      </div>

      {/* Active Murderer Status Banner */}
      <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{currentKiller?.avatarIcon}</span>
          <div>
            <p className="text-xs text-neutral-400">Aktuell aktiver Mörder im Spiel:</p>
            <p className="text-sm font-bold text-amber-400 font-serif-title">
              {currentKiller?.name} ({currentKiller?.title})
            </p>
          </div>
        </div>
        <span className="text-xs font-mono px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
          ✓ Fall ist zu 100 % logisch lösbar
        </span>
      </div>

      {/* Characters List & Simulation Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeCharacters.map((char) => {
          const isSick = char.status === 'absent';
          const isLate = char.status === 'arriving_late';
          const isEarly = char.status === 'leaving_early';

          return (
            <div
              key={char.id}
              className={`p-5 rounded-2xl border transition-all ${
                isSick
                  ? 'bg-rose-950/20 border-rose-900/60 opacity-75'
                  : isLate
                  ? 'bg-cyan-950/20 border-cyan-800/60'
                  : isEarly
                  ? 'bg-amber-950/20 border-amber-800/60'
                  : 'bg-neutral-900/90 border-neutral-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 bg-neutral-950 rounded-xl border border-neutral-800">
                    {char.avatarIcon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-neutral-100 font-serif-title">
                        {char.name}
                      </h3>
                      {char.isMurderer && (
                        <span className="text-[9px] bg-rose-600 text-white px-1.5 py-0.5 rounded font-mono font-bold">
                          MÖRDER
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-amber-400">{char.title}</p>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      {char.isCore ? 'Kernrolle (Hauptstrang)' : 'Modulare Rolle (Zusatzgast)'}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                    isSick
                      ? 'bg-rose-500/30 text-rose-300 border border-rose-500/40'
                      : isLate
                      ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/40'
                      : isEarly
                      ? 'bg-amber-500/30 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {isSick
                    ? 'Ausgefallen (NPC)'
                    : isLate
                    ? 'Kommt später'
                    : isEarly
                    ? 'Geht früher'
                    : 'Aktiv'}
                </span>
              </div>

              {/* NPC Letter preview if sick */}
              {isSick && char.fallbackNpcLetter && (
                <div className="mb-3 p-3 bg-neutral-950/90 rounded-xl border border-neutral-800 text-xs text-neutral-300 italic font-story">
                  <p className="font-sans text-[10px] uppercase font-bold text-neutral-500 not-italic mb-1 flex items-center gap-1">
                    <FileText className="w-3 h-3 text-amber-400" />
                    <span>Automatisch generiertes Vorlese-Dokument:</span>
                  </p>
                  „{char.fallbackNpcLetter}“
                </div>
              )}

              {/* Simulation Action Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-neutral-800/80">
                <button
                  disabled={isSick}
                  onClick={() => handleMarkSick(char.id)}
                  className="px-2.5 py-1.5 bg-rose-950/70 hover:bg-rose-900 border border-rose-800/60 disabled:opacity-30 text-rose-300 text-[11px] rounded-lg transition-all flex items-center gap-1"
                >
                  <UserX className="w-3 h-3" />
                  <span>Krank / Ausfall</span>
                </button>

                <button
                  disabled={isLate || isSick}
                  onClick={() => handleMarkLate(char.id)}
                  className="px-2.5 py-1.5 bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-800/60 disabled:opacity-30 text-cyan-300 text-[11px] rounded-lg transition-all flex items-center gap-1"
                >
                  <Clock className="w-3 h-3" />
                  <span>Kommt zu Gang 2</span>
                </button>

                <button
                  disabled={isEarly || isSick}
                  onClick={() => handleMarkEarlyLeave(char.id)}
                  className="px-2.5 py-1.5 bg-amber-950/70 hover:bg-amber-900 border border-amber-800/60 disabled:opacity-30 text-amber-300 text-[11px] rounded-lg transition-all flex items-center gap-1"
                >
                  <ArrowRight className="w-3 h-3" />
                  <span>Geht nach Gang 2</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live System Log */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-3">
        <h3 className="text-xs font-mono uppercase font-bold text-neutral-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Dynamisches Rebalancing-Protokoll:</span>
        </h3>
        <div className="space-y-1.5 max-h-48 overflow-y-auto font-mono text-xs text-neutral-300 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
          {rebalanceLog.map((log, i) => (
            <p key={i} className="leading-relaxed">
              &gt; {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
