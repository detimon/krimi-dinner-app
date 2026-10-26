import React, { useState } from 'react';
import { Character, Clue, GameStage } from '../../types';
import {
  ShieldAlert,
  Target,
  MessageSquare,
  Lock,
  Unlock,
  FileEdit,
  CheckCircle,
  Eye,
  Send
} from 'lucide-react';

interface PlayerScreenProps {
  characters: Character[];
  clues: Clue[];
  currentStage: GameStage;
}

export const PlayerScreen: React.FC<PlayerScreenProps> = ({
  characters,
  clues,
  currentStage
}) => {
  // Currently viewed character on phone
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>(characters[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'mission' | 'secrets' | 'clues' | 'notes' | 'vote'>('mission');

  // Player notes (stored per character in state)
  const [notes, setNotes] = useState<Record<string, string>>({
    eleanor: 'Hastings wirkt blass und zittrig. James stand lange am Kamin...',
    hastings: 'Meine Arzttasche... wer hatte Zugang? Ich muss unauffällig bleiben.',
    sterling: 'Niemand ahnt etwas. Eleanor und Victoria ziehen alle Blicke auf sich.',
    victoria: 'Ich brauche dieses Geld, aber Onkel Reginald ist tot... was passiert mit dem Testament?',
    finch: 'Sherry-Karaffe enthält Bittermandel. Nur Sterling und Hastings betraten den Raum.',
    dubois: 'Die Gemälde im Salon sind Fälschungen. Reginald wusste es.'
  });

  // Accusation state
  const [votedSuspect, setVotedSuspect] = useState<string>('');
  const [accusationMotive, setAccusationMotive] = useState<string>('');
  const [voteSubmitted, setVoteSubmitted] = useState<boolean>(false);

  const character = characters.find((c) => c.id === selectedCharacterId) || characters[0];

  // Determine current round info based on game stage
  const getRoundData = () => {
    if (currentStage === 'round3_climax' || currentStage === 'accusation' || currentStage === 'epilogue') {
      return { number: 3, name: 'Runde 3: Finale Indizien (Dessert)', data: character.rounds.round3 };
    }
    if (currentStage === 'round2_alibis') {
      return { number: 2, name: 'Runde 2: Kreuzverhör (Hauptgang)', data: character.rounds.round2 };
    }
    return { number: 1, name: 'Runde 1: Empfang (Vorspeise)', data: character.rounds.round1 };
  };

  const currentRound = getRoundData();

  const handleNoteChange = (text: string) => {
    setNotes((prev) => ({ ...prev, [selectedCharacterId]: text }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      {/* Smartphone Simulator Header & Role Switcher */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span className="font-mono text-amber-500 flex items-center gap-1.5 font-semibold">
            📱 SPION-ANSICHT (DEIN SMARTPHONE)
          </span>
          <span>Rolle wechseln für Test:</span>
        </div>

        {/* Character Quick Switcher Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {characters.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCharacterId(c.id);
                setVoteSubmitted(false);
              }}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCharacterId === c.id
                  ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-950'
                  : 'bg-neutral-800/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              <span>{c.avatarIcon}</span>
              <span>{c.name.split(' ')[0]}</span>
              {c.isMurderer && (
                <span className="text-[9px] bg-rose-500/30 text-rose-300 px-1 rounded font-mono">
                  MÖRDER
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Character Profile Card */}
      <div className="relative overflow-hidden bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="text-4xl p-3 bg-neutral-950 rounded-2xl border border-neutral-800 shadow-inner">
              {character.avatarIcon}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-serif-title text-neutral-100">
                  {character.name}
                </h2>
                {character.isMurderer && (
                  <span className="text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded-full">
                    Du bist der Mörder!
                  </span>
                )}
              </div>
              <p className="text-xs text-amber-400 font-medium">{character.title}</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                {character.age} Jahre • {character.relationToVictim}
              </p>
            </div>
          </div>
        </div>

        {/* Public Bio vs Costume hint */}
        <p className="text-xs text-neutral-300 leading-relaxed font-story bg-neutral-950/70 p-3 rounded-xl border border-neutral-800/80">
          „{character.publicBio}“
        </p>

        {/* Mobile Navigation Tabs */}
        <div className="grid grid-cols-5 gap-1 pt-2 border-t border-neutral-800/80">
          <button
            onClick={() => setActiveTab('mission')}
            className={`py-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
              activeTab === 'mission'
                ? 'bg-amber-600/20 text-amber-400 border border-amber-500/40'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Target className="w-4 h-4" />
            <span className="text-[10px]">Mission</span>
          </button>

          <button
            onClick={() => setActiveTab('secrets')}
            className={`py-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
              activeTab === 'secrets'
                ? 'bg-amber-600/20 text-amber-400 border border-amber-500/40'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span className="text-[10px]">Geheimnis</span>
          </button>

          <button
            onClick={() => setActiveTab('clues')}
            className={`py-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
              activeTab === 'clues'
                ? 'bg-amber-600/20 text-amber-400 border border-amber-500/40'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span className="text-[10px]">Beweise</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`py-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
              activeTab === 'notes'
                ? 'bg-amber-600/20 text-amber-400 border border-amber-500/40'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <FileEdit className="w-4 h-4" />
            <span className="text-[10px]">Notizen</span>
          </button>

          <button
            onClick={() => setActiveTab('vote')}
            className={`py-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
              activeTab === 'vote'
                ? 'bg-rose-600/20 text-rose-300 border border-rose-500/40'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="text-[10px]">Anklage</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Current Round Mission & Objectives */}
      {activeTab === 'mission' && (
        <div className="space-y-4">
          <div className="p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-between text-xs">
            <span className="font-semibold text-neutral-300">{currentRound.name}</span>
            <span className="font-mono text-amber-400 text-[11px]">Aktuelle Phase</span>
          </div>

          {/* Primary Secret Mission for this round */}
          <div className="p-5 bg-gradient-to-r from-amber-950/40 via-neutral-900 to-neutral-900 border border-amber-500/40 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold">
              <Target className="w-4 h-4" />
              <span>DEINE MISSION IN DIESER RUNDE</span>
            </div>
            <p className="text-sm text-neutral-100 font-medium leading-relaxed">
              {currentRound.data.secretMission}
            </p>
          </div>

          {/* Secrets to protect */}
          <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold">
              <Lock className="w-4 h-4" />
              <span>UNTER ALLEN UMSTÄNDEN GEHEIM HALTEN</span>
            </div>
            <ul className="space-y-2">
              {currentRound.data.secretsToProtect.map((s, idx) => (
                <li
                  key={idx}
                  className="text-xs text-neutral-200 bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-start gap-2.5"
                >
                  <span className="text-rose-400 font-bold shrink-0">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Rumors to share */}
          <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold">
              <MessageSquare className="w-4 h-4" />
              <span>GERÜCHTE & INFOS, DIE DU STREUEN DARFST</span>
            </div>
            <ul className="space-y-2">
              {currentRound.data.publicRumorsToShare.map((r, idx) => (
                <li
                  key={idx}
                  className="text-xs text-neutral-200 bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-start gap-2.5"
                >
                  <span className="text-cyan-400 font-bold shrink-0">💬</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab 2: Secret Backstory & True Identity */}
      {activeTab === 'secrets' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold">
            <Lock className="w-4 h-4" />
            <span>DEINE GEHEIME VORGESCHICHTE (NUR FÜR DEINE AUGEN)</span>
          </div>

          <div className="p-4 bg-neutral-950 rounded-xl border border-rose-950/60 text-xs sm:text-sm text-neutral-200 leading-relaxed font-story space-y-3">
            <p>{character.secretBackstory}</p>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-mono text-neutral-400 uppercase font-semibold">
              Warum du ein Mordmotiv hättest:
            </h4>
            <div className="space-y-1.5">
              {character.motives.map((m, i) => (
                <div
                  key={i}
                  className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800/80 text-xs text-neutral-300"
                >
                  ⚖️ {m}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Unlocked Clues */}
      {activeTab === 'clues' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
            <span>Aufgedeckte Beweismittel am Tatort:</span>
            <span>{clues.filter((c) => c.isRevealed).length} verfügbar</span>
          </div>

          {clues.map((clue) => (
            <div
              key={clue.id}
              className={`p-4 rounded-2xl border transition-all ${
                clue.isRevealed
                  ? 'bg-neutral-900 border-amber-500/40'
                  : 'bg-neutral-900/40 border-neutral-800/80 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-neutral-100 flex items-center gap-2">
                  <span>{clue.type === 'audio' ? '📻' : clue.type === 'document' ? '📄' : '🔍'}</span>
                  <span>{clue.title}</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                  {clue.isRevealed ? 'Fundort: ' + clue.foundLocation : 'Noch gesperrt'}
                </span>
              </div>

              {clue.isRevealed ? (
                <p className="text-xs text-neutral-300 font-story leading-relaxed mt-2 p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                  {clue.detailedContent}
                </p>
              ) : (
                <p className="text-xs text-neutral-500 italic mt-1">
                  Dieser Hinweis wird vom Spielleiter im Laufe des Abends aufgedeckt...
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Private Notes */}
      {activeTab === 'notes' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
              <FileEdit className="w-4 h-4" />
              <span>DEIN PERSÖNLICHER ERMITTLUNGS-BLOCK</span>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">Wird automatisch gesichert</span>
          </div>

          <textarea
            value={notes[selectedCharacterId] || ''}
            onChange={(e) => handleNoteChange(e.target.value)}
            placeholder="Schreibe hier verdächtige Aussagen, Alibis und Notizen deiner Mitspieler auf..."
            className="w-full h-56 p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs sm:text-sm font-mono focus:border-amber-500 focus:outline-none resize-none leading-relaxed"
          />

          <p className="text-[11px] text-neutral-400 italic">
            💡 Tipp: Achte darauf, wer zu welchen Uhrzeiten die Bibliothek verlassen hat!
          </p>
        </div>
      )}

      {/* Tab 5: Accusation & Voting */}
      {activeTab === 'vote' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold">
            <ShieldAlert className="w-4 h-4" />
            <span>GEHEIME ANKLAGE & VERDACHT</span>
          </div>

          {voteSubmitted ? (
            <div className="p-6 bg-emerald-950/30 border border-emerald-500/40 rounded-2xl text-center space-y-3">
              <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="font-serif-title text-lg font-bold text-emerald-300">
                Deine Stimme wurde versiegelt!
              </h3>
              <p className="text-xs text-neutral-300">
                Du hast <strong>{characters.find((c) => c.id === votedSuspect)?.name}</strong> als
                Mörder angeklagt. Warte, bis der Spielleiter das offizielle Geständnis enthüllt!
              </p>
              <button
                onClick={() => setVoteSubmitted(false)}
                className="text-xs text-neutral-400 hover:text-neutral-200 underline mt-2"
              >
                Stimme ändern
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-neutral-300">
                Wen klagst du an? Wähle die Person, die deiner Meinung nach Lord Reginald Blackwood
                auf dem Gewissen hat:
              </p>

              <div className="grid grid-cols-2 gap-2">
                {characters
                  .filter((c) => c.id !== character.id) // Can't vote for oneself
                  .map((suspect) => (
                    <button
                      key={suspect.id}
                      onClick={() => setVotedSuspect(suspect.id)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        votedSuspect === suspect.id
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-md shadow-rose-950'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <span className="text-xl">{suspect.avatarIcon}</span>
                      <div className="truncate">
                        <p className="text-xs font-semibold truncate">{suspect.name}</p>
                        <p className="text-[10px] text-neutral-500 truncate">{suspect.title}</p>
                      </div>
                    </button>
                  ))}
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-neutral-300 block">
                  Deine Theorie / Das Tatmotiv (Optional):
                </label>
                <input
                  type="text"
                  value={accusationMotive}
                  onChange={(e) => setAccusationMotive(e.target.value)}
                  placeholder="z.B. Er wollte an das alte Testament herankommen..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <button
                disabled={!votedSuspect}
                onClick={() => setVoteSubmitted(true)}
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-rose-950 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Geheime Anklage abgeben</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
