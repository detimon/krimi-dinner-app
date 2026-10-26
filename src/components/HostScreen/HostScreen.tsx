import React, { useState, useEffect } from 'react';
import { MysteryCase, Character, Clue, GameStage } from '../../types';
import { soundEngine } from '../../utils/soundEngine';
import {
  Volume2,
  VolumeX,
  Flame,
  Wind,
  Bell,
  Skull,
  Play,
  Pause,
  RotateCcw,
  Eye,
  CheckCircle2,
  Radio,
  FileText,
  Clock,
  Sparkles,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HostScreenProps {
  mysteryCase: MysteryCase;
  characters: Character[];
  clues: Clue[];
  currentStage: GameStage;
  onSetStage: (stage: GameStage) => void;
  onRevealClue: (clueId: string) => void;
  onToggleCharacterStatus: (charId: string) => void;
}

export const HostScreen: React.FC<HostScreenProps> = ({
  mysteryCase,
  characters,
  clues,
  currentStage,
  onSetStage,
  onRevealClue,
}) => {
  // Soundscape state
  const [isWindActive, setIsWindActive] = useState(false);
  const [isFireActive, setIsFireActive] = useState(false);
  const [isPlayingAudioClue, setIsPlayingAudioClue] = useState(false);

  // Timer state
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 min default per act
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsLeft]);

  const toggleWind = () => {
    const newState = soundEngine.toggleWind();
    setIsWindActive(newState);
  };

  const toggleFire = () => {
    const newState = soundEngine.toggleFire();
    setIsFireActive(newState);
  };

  const playClock = () => {
    soundEngine.playClockBell();
  };

  const triggerMurderDramatics = () => {
    soundEngine.playMurderStinger();
    onSetStage('murder_reveal');
  };

  const playAudioClueEdison = () => {
    const audioClue = clues.find((c) => c.type === 'audio');
    if (!audioClue?.audioTranscript) return;

    setIsPlayingAudioClue(true);
    soundEngine.playVintageSpeech(audioClue.audioTranscript, () => {
      setIsPlayingAudioClue(false);
    });
  };

  const stopAudioSpeech = () => {
    soundEngine.stopSpeech();
    setIsPlayingAudioClue(false);
  };

  const triggerVictoryConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const stages: { id: GameStage; name: string; courseRef?: string }[] = [
    { id: 'prologue', name: '1. Begrüßung & Prolog' },
    { id: 'round1_reception', name: '2. Runde 1: Aperitif & Vorstellung', courseRef: 'Vorspeise' },
    { id: 'murder_reveal', name: '⚡ DER MORD AM LORD!' },
    { id: 'round2_alibis', name: '3. Runde 2: Das Kreuzverhör', courseRef: 'Hauptgang' },
    { id: 'round3_climax', name: '4. Runde 3: Finale Indizien', courseRef: 'Dessert' },
    { id: 'accusation', name: '5. Geheime Anklage' },
    { id: 'epilogue', name: '6. Das Geständnis & Auflösung' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Banner: Central Room Title & Ambience Controls */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/40 border border-neutral-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono tracking-wide border border-amber-500/30">
                HOST-SCREEN (TISCH-ZENTRALE)
              </span>
              <span className="text-xs text-neutral-400">
                {mysteryCase.period}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-serif-title text-neutral-100 tracking-wide">
              {mysteryCase.title}
            </h1>
            <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mt-1 font-story italic">
              „{mysteryCase.tagline}“
            </p>
          </div>

          {/* Ambience Audio Synthesizer */}
          <div className="bg-neutral-950/80 p-4 rounded-xl border border-neutral-800 backdrop-blur-md shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>Atmosphären-Soundboard:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={toggleWind}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isWindActive
                    ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950'
                    : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
                title="Eisiger Wind & Schneesturm über dem Hochmoor"
              >
                <Wind className={`w-3.5 h-3.5 ${isWindActive ? 'animate-pulse' : ''}`} />
                <span>Schneesturm {isWindActive ? 'AN' : 'AUS'}</span>
              </button>

              <button
                onClick={toggleFire}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isFireActive
                    ? 'bg-amber-950/80 text-amber-300 border border-amber-500/50 shadow-md shadow-amber-950'
                    : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
                title="Knistern des Kaminfeuers im Speisesaal"
              >
                <Flame className={`w-3.5 h-3.5 ${isFireActive ? 'text-amber-400 animate-pulse' : ''}`} />
                <span>Kaminfeuer {isFireActive ? 'AN' : 'AUS'}</span>
              </button>

              <button
                onClick={playClock}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-all active:scale-95"
                title="Schlossuhr schlagen lassen"
              >
                <Bell className="w-3.5 h-3.5 text-amber-400" />
                <span>Schlossuhr</span>
              </button>
            </div>
          </div>
        </div>

        {/* Phase / Stage Step Bar */}
        <div className="mt-8 pt-6 border-t border-neutral-800/80">
          <div className="flex items-center justify-between overflow-x-auto pb-2 gap-2">
            {stages.map((stage, idx) => {
              const isCurrent = currentStage === stage.id;
              const isPast = stages.findIndex((s) => s.id === currentStage) > idx;

              return (
                <button
                  key={stage.id}
                  onClick={() => onSetStage(stage.id)}
                  className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                    isCurrent
                      ? stage.id === 'murder_reveal'
                        ? 'bg-rose-950 text-rose-300 border border-rose-500 shadow-lg shadow-rose-950/50 font-bold'
                        : 'bg-amber-600 text-white font-bold shadow-lg shadow-amber-900/50'
                      : isPast
                      ? 'bg-neutral-800/80 text-neutral-300 border border-neutral-700'
                      : 'bg-neutral-900/40 text-neutral-500 border border-neutral-800/60 hover:text-neutral-300'
                  }`}
                >
                  {isPast ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : isCurrent && stage.id === 'murder_reveal' ? (
                    <Skull className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-current opacity-70" />
                  )}
                  <span>{stage.name}</span>
                  {stage.courseRef && (
                    <span className="opacity-75 font-normal text-[10px] hidden xl:inline">
                      ({stage.courseRef})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid: Live Act Control & Timeline + Clue Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Active Stage Content & Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stage 1: Prologue */}
          {currentStage === 'prologue' && (
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <span className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                  <Sparkles className="w-6 h-6" />
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-neutral-100">
                    Akt I: Die Ankunft auf Schloss Blackwood
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Vorspeise wird serviert • Alle Gäste sind noch ahnungslos
                  </p>
                </div>
              </div>

              <div className="p-5 bg-neutral-950/90 rounded-xl border border-neutral-800 text-neutral-300 text-sm sm:text-base leading-relaxed font-story space-y-3">
                <p>
                  <strong>Text für den Gastgeber zum Vorlesen:</strong>
                </p>
                <p className="italic">
                  „Willkommen auf Schloss Blackwood! Ein unbarmherziger Novembersturm peitscht
                  über das Hochmoor von Devon. Die Moorstraße ist von Schneewehen blockiert,
                  und die Telegrafenleitungen sind tot. Wir sind vollkommen von der Außenwelt
                  abgeschnitten.“
                </p>
                <p className="italic">
                  „Lord Reginald Blackwood hat uns alle mit einem dringlichen Brief einberufen.
                  Er kündigte an, heute Abend sein gesamtes Vermächtnis und sein neues Testament
                  zu verkünden. Er sitzt an der Stirnseite der Tafel, beobachtet uns mit
                  durchdringendem Blick und nippt an seinem Amontillado-Sherry...“
                </p>
              </div>

              <div className="p-4 bg-amber-950/20 border border-amber-900/30 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-amber-300">
                    🍽️ Serviere Gang 1: Waldpilz-Maronen-Velouté
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Lass die Spieler sich in ihren Rollen vorstellen, während sie die Suppe löffeln.
                  </p>
                </div>
                <button
                  onClick={() => onSetStage('round1_reception')}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs sm:text-sm rounded-lg transition-all"
                >
                  Weiter zu Runde 1 &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Stage 2: Round 1 Reception */}
          {currentStage === 'round1_reception' && (
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                    <Users className="w-6 h-6" />
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-neutral-100">
                      Runde 1: Empfang & Gerüchte
                    </h2>
                    <p className="text-xs text-neutral-400">
                      Die Gäste sprechen miteinander und verfolgen ihre ersten Geheimaufträge.
                    </p>
                  </div>
                </div>

                {/* Dramatic Action Trigger */}
                <button
                  onClick={triggerMurderDramatics}
                  className="px-4 py-2.5 bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-rose-950 flex items-center gap-2 transition-all active:scale-95 animate-pulse"
                >
                  <Skull className="w-4 h-4" />
                  <span>⚡ Mord auslösen!</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                  <h4 className="text-xs font-mono uppercase text-amber-400">Ziele für diese Runde:</h4>
                  <ul className="text-xs text-neutral-300 space-y-1.5 list-disc pl-4">
                    <li>Jeder Spieler stellt kurz seine Figur vor.</li>
                    <li>Erste Geheimnisse werden durch Gerüchte angedeutet.</li>
                    <li>Lord Reginald stößt mit seiner Sherry-Karaffe an.</li>
                  </ul>
                </div>
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                  <h4 className="text-xs font-mono uppercase text-cyan-400">Host-Tipp:</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Achte darauf, dass die Spieler auf ihre Smartphones schauen oder ihre
                    Rollenhefte zur Hand haben. Jeder hat bereits private Missionen für Runde 1!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Stage: The Dramatic Murder! */}
          {currentStage === 'murder_reveal' && (
            <div className="bg-gradient-to-b from-rose-950/40 via-neutral-900 to-neutral-900 border-2 border-rose-500/60 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-rose-950">
              <div className="flex items-center gap-3">
                <span className="p-3 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/40">
                  <Skull className="w-8 h-8 animate-pulse text-rose-400" />
                </span>
                <div>
                  <span className="text-xs font-mono tracking-widest text-rose-400 uppercase font-bold">
                    DRAMATISCHER WENDEPUNKT
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-neutral-100">
                    Lord Reginald Blackwood ist tot!
                  </h2>
                </div>
              </div>

              <div className="p-5 bg-neutral-950/90 rounded-xl border border-rose-900/40 text-neutral-200 text-sm sm:text-base leading-relaxed font-story space-y-3">
                <p>
                  <strong>Vorlesetext des Inspektors / Spielleiters:</strong>
                </p>
                <p className="italic text-rose-200">
                  „Lord Reginald erhob sich am Kopf der Tafel. Er hielt sein Sherry-Glas ins
                  flackernde Kerzenlicht und sprach mit eiskalter Stimme: ‚Ich habe euch hierher
                  gerufen, weil einer von euch eine Schlange an meiner Brust ist. Heute Abend
                  wird die Wahrheit siegeln...‘“
                </p>
                <p className="italic text-rose-200">
                  „Er setzte das Glas an, trank einen tiefen Schluck – und erstarrte. Das Glas
                  zerschmetterte auf der Eichenplatte. Reginald griff sich an den Hals, nach Luft
                  ringend, seine Augen traten hervor. Innerhalb von Sekunden brach er reglos auf
                  seinem Stuhl zusammen. Der bittere Geruch von gerösteten Mandeln erfüllt den Raum.“
                </p>
              </div>

              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-neutral-400">
                  <p className="font-semibold text-neutral-200">Beweis sichergestellt:</p>
                  <p>Die vergiftete Sherry-Karaffe liegt ab sofort auf dem Beweistisch!</p>
                </div>
                <button
                  onClick={() => {
                    onRevealClue('clue-sherry');
                    onSetStage('round2_alibis');
                  }}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md"
                >
                  Beweis aufdecken & weiter zu Runde 2 (Hauptgang) &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Stage: Round 2 Cross-Examination & Main Course */}
          {currentStage === 'round2_alibis' && (
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <span className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                  <FileText className="w-6 h-6" />
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-neutral-100">
                    Runde 2: Das Kreuzverhör & Alibi-Prüfung
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Hauptgang wird serviert • Wer war zwischen 19:30 und 20:00 Uhr in der Bibliothek?
                  </p>
                </div>
              </div>

              <div className="p-5 bg-neutral-950/90 rounded-xl border border-neutral-800 text-neutral-300 text-sm leading-relaxed space-y-2">
                <h4 className="text-xs font-mono uppercase text-amber-400 font-bold">
                  Ermittlungs-Schwerpunkte:
                </h4>
                <p>
                  • <strong>Dr. Hastings</strong> steht unter Druck wegen seines Zugangs zu
                  Blausäure.
                </p>
                <p>
                  • <strong>Lady Eleanor</strong> wurde mit den Schlüsseln zum Privattresor
                  gesehen.
                </p>
                <p>
                  • <strong>James Sterling</strong> brachte die Karaffe an den Tisch.
                </p>
              </div>

              <div className="p-4 bg-amber-950/20 border border-amber-900/30 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-amber-300">
                    🍽️ Serviere Gang 2: Blackwood-Schmortopf
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Perfekt zum Essen während hitziger Diskussionen am Tisch.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onRevealClue('clue-will');
                    onRevealClue('clue-bag');
                    onSetStage('round3_climax');
                  }}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs sm:text-sm rounded-lg transition-all"
                >
                  Weiter zu Runde 3 (Dessert) &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Stage: Round 3 Climax */}
          {currentStage === 'round3_climax' && (
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <span className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                  <Radio className="w-6 h-6" />
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-neutral-100">
                    Runde 3: Die Schlinge zieht sich zu
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Dessert wird serviert • Das Edison-Tonband wird abgespielt!
                  </p>
                </div>
              </div>

              {/* Edison Phonograph Audio Player */}
              <div className="p-5 bg-gradient-to-r from-amber-950/40 via-neutral-950 to-neutral-950 border border-amber-500/30 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold">
                    <Radio className="w-4 h-4 animate-pulse" />
                    <span>EDISON-DIKTIERGERÄT: REGINALDS LETZTE WORTE</span>
                  </div>
                  {isPlayingAudioClue ? (
                    <button
                      onClick={stopAudioSpeech}
                      className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded-lg flex items-center gap-1.5"
                    >
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Stop</span>
                    </button>
                  ) : (
                    <button
                      onClick={playAudioClueEdison}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow-md shadow-amber-950"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>▶ Tonband laut abspielen</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-neutral-300 font-story italic leading-relaxed">
                  „James... schreib das Wort für Wort! Glaubst du im Ernst, ich wüsste nicht, wer
                  du bist? Dein Vater Robert war ein Hochstapler, und du kriechst unter falschem
                  Namen in mein Haus! Heute Abend werde ich deine Farce vor allen beenden!“
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    onRevealClue('clue-audio');
                    onRevealClue('clue-photo');
                  }}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Alle Beweise für Spieler freischalten</span>
                </button>
                <button
                  onClick={() => onSetStage('accusation')}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md"
                >
                  Zur finalen Abstimmung &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Stage: Accusation Voting */}
          {currentStage === 'accusation' && (
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <span className="p-3 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
                  <Skull className="w-6 h-6" />
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-neutral-100">
                    Die finale Anklage
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Jeder Spieler nennt reihum seinen Verdacht und das vermutete Motiv!
                  </p>
                </div>
              </div>

              <div className="p-5 bg-neutral-950 rounded-xl border border-neutral-800 space-y-4">
                <h4 className="text-xs font-mono uppercase text-amber-400 font-bold">
                  Ablauf des Plädoyers:
                </h4>
                <ol className="text-xs sm:text-sm text-neutral-300 space-y-2 list-decimal pl-5">
                  <li>
                    Jeder Gast hält ein 1-minütiges Schluss-Plädoyer: Wer ist der Mörder und
                    wie lief die Tat ab?
                  </li>
                  <li>
                    Jeder Spieler wählt auf seinem Smartphone (oder auf einem Zettel) geheim seinen
                    Verdächtigen.
                  </li>
                  <li>Erst wenn alle gestimmt haben, deckt der Host das Geständnis auf!</li>
                </ol>
              </div>

              <button
                onClick={() => {
                  triggerVictoryConfetti();
                  onSetStage('epilogue');
                }}
                className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-xl shadow-amber-950 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Geständnis enthüllen & Fall auflösen!</span>
              </button>
            </div>
          )}

          {/* Stage: Epilogue & Full Confession */}
          {currentStage === 'epilogue' && (
            <div className="bg-gradient-to-b from-amber-950/40 via-neutral-900 to-neutral-900 border-2 border-amber-500/60 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center gap-3">
                <span className="p-3 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/40">
                  👑
                </span>
                <div>
                  <span className="text-xs font-mono tracking-widest text-amber-400 uppercase font-bold">
                    DIE WAHRHEIT IST ENTHÜLLT
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-neutral-100">
                    Der Mörder: {mysteryCase.solution.killerName}
                  </h2>
                </div>
              </div>

              {/* Full Confession */}
              <div className="p-6 bg-neutral-950 rounded-xl border border-neutral-800 space-y-4">
                <h4 className="text-xs font-mono uppercase text-rose-400 font-bold flex items-center gap-1.5">
                  <Skull className="w-4 h-4" />
                  <span>Das Geständnis von James Sterling (Julian Blackwood):</span>
                </h4>
                <p className="text-sm sm:text-base text-neutral-200 font-story italic leading-relaxed">
                  „{mysteryCase.solution.fullConfession}“
                </p>
              </div>

              {/* Chronology Matrix */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-neutral-400 font-bold">
                  Die wahre Chronologie des Mordabends:
                </h4>
                <div className="space-y-2">
                  {mysteryCase.solution.chronology.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800/80 text-xs"
                    >
                      <span className="font-mono text-amber-400 font-semibold w-14 shrink-0">
                        {c.time}
                      </span>
                      <span className="text-neutral-300 flex-1">{c.event}</span>
                      <span className="text-neutral-500 text-[11px] italic shrink-0">
                        {c.actor}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (1 Col): Timer + Clue Board + Guests */}
        <div className="space-y-6">
          {/* Host Timer Widget */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>RUNDEN-TIMER</span>
              </span>
              <span>{isTimerRunning ? 'Läuft' : 'Pausiert'}</span>
            </div>

            <div className="text-center py-2">
              <span className="font-mono text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100">
                {formatTimer(secondsLeft)}
              </span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isTimerRunning
                    ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40'
                    : 'bg-amber-600 hover:bg-amber-500 text-white shadow-md'
                }`}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setSecondsLeft(25 * 60);
                }}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200 transition-all"
                title="Timer zurücksetzen (25 Min)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Clues & Evidence Board */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-title text-sm font-bold text-neutral-200 flex items-center gap-2">
                <span>🔍</span>
                <span>Beweismittel-Akte</span>
              </h3>
              <span className="text-xs font-mono text-neutral-400">
                {clues.filter((c) => c.isRevealed).length}/{clues.length} Offen
              </span>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {clues.map((clue) => (
                <div
                  key={clue.id}
                  className={`p-3 rounded-xl border transition-all ${
                    clue.isRevealed
                      ? 'bg-neutral-950/90 border-amber-500/30 text-neutral-200'
                      : 'bg-neutral-950/40 border-neutral-800/80 opacity-60 text-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-neutral-200 truncate pr-2">
                      {clue.title}
                    </span>
                    <button
                      onClick={() => onRevealClue(clue.id)}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded transition-all ${
                        clue.isRevealed
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-neutral-800 text-neutral-300 hover:bg-amber-600 hover:text-white'
                      }`}
                    >
                      {clue.isRevealed ? '✓ Sichtbar' : '+ Aufdecken'}
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-400 line-clamp-2">{clue.teaser}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Guests / Suspects Quick View */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-serif-title font-bold text-neutral-200">
                Gästeliste ({characters.length})
              </span>
              <span className="text-neutral-400 font-mono">
                {characters.filter((c) => c.status === 'active').length} aktiv
              </span>
            </div>

            <div className="space-y-1.5">
              {characters.map((char) => (
                <div
                  key={char.id}
                  className={`flex items-center justify-between p-2 rounded-lg text-xs border ${
                    char.status === 'active'
                      ? 'bg-neutral-950 border-neutral-800 text-neutral-300'
                      : 'bg-rose-950/20 border-rose-900/40 text-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span>{char.avatarIcon}</span>
                    <span className="truncate">{char.name}</span>
                  </div>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      char.status === 'active'
                        ? 'bg-neutral-800 text-neutral-400'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {char.status === 'active' ? 'Anwesend' : 'Abwesend (NPC)'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
