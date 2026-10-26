import React, { useState } from 'react';
import { MysteryCase, Character } from '../../types';
import { Printer, FileDown, BookOpen, Utensils, Mail, ShieldCheck } from 'lucide-react';

interface PrintViewProps {
  mysteryCase: MysteryCase;
  characters: Character[];
}

export const PrintView: React.FC<PrintViewProps> = ({ mysteryCase, characters }) => {
  const [selectedPrintMode, setSelectedPrintMode] = useState<'all' | 'booklets' | 'menu' | 'solution'>('all');

  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Host Instructions (Hidden in Print) */}
      <div className="no-print bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/40 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                <Printer className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                PRINT-AT-HOME / PDF-EXPORT
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif-title text-neutral-100">
              Druckvorlagen für den analogen Spielabend
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl font-story">
              Drucke alle Rollenhefte, Menükarten und den versiegelten Lösungsumschlag direkt als PDF
              oder auf Papier aus. So könnt ihr haptisch am Esstisch spielen!
            </p>
          </div>

          <button
            onClick={triggerPrint}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm rounded-xl transition-all shadow-xl shadow-amber-950 flex items-center justify-center gap-2 shrink-0 active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Jetzt Drucken / Als PDF speichern</span>
          </button>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-neutral-800/80 overflow-x-auto pb-1 text-xs">
          <span className="text-neutral-500 font-medium mr-1">Druck-Auswahl:</span>
          <button
            onClick={() => setSelectedPrintMode('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedPrintMode === 'all'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            Alles (Komplett-Set)
          </button>
          <button
            onClick={() => setSelectedPrintMode('booklets')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedPrintMode === 'booklets'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            Nur Rollenhefte ({characters.length})
          </button>
          <button
            onClick={() => setSelectedPrintMode('menu')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedPrintMode === 'menu'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            Nur Menü & Tischkarten
          </button>
          <button
            onClick={() => setSelectedPrintMode('solution')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedPrintMode === 'solution'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            Nur Versiegelte Lösung
          </button>
        </div>
      </div>

      {/* PRINTABLE CONTENT AREA (Styled for white paper printing) */}
      <div className="space-y-12 bg-white text-neutral-900 p-6 sm:p-12 rounded-2xl shadow-xl print-booklet">
        {/* Printable Section 1: Menu & Place Cards */}
        {(selectedPrintMode === 'all' || selectedPrintMode === 'menu') && (
          <div className="page-break space-y-8 border-b-2 border-dashed border-neutral-300 pb-12">
            <div className="text-center space-y-2 max-w-xl mx-auto border-4 border-double border-neutral-800 p-8 rounded-lg">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block">
                Schloss Blackwood • Hochmoor Dartmoor
              </span>
              <h2 className="text-2xl font-bold font-serif-title uppercase tracking-wider text-neutral-900">
                Menu du Soir
              </h2>
              <p className="text-xs italic text-neutral-600 font-story">
                Zu Ehren der Verkündung des Testaments durch Lord Reginald Blackwood
              </p>

              <div className="pt-6 space-y-6">
                {mysteryCase.dinnerMenu.map((course) => (
                  <div key={course.courseNumber} className="space-y-1">
                    <span className="text-[11px] font-mono uppercase text-amber-800 font-bold block">
                      {course.courseTitle}
                    </span>
                    <p className="font-serif-title font-bold text-sm text-neutral-900">
                      {course.dishName}
                    </p>
                    <p className="text-xs text-neutral-600 font-story italic">
                      {course.dishDescription}
                    </p>
                    <p className="text-[10px] text-neutral-500 font-mono">
                      Wein: {course.drinksPairing}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Printable Place Cards */}
            <div className="space-y-3 pt-6">
              <h3 className="text-xs font-mono uppercase font-bold text-neutral-500 text-center">
                ✂️ Tischkarten zum Ausschneiden & Aufstellen:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {characters.map((char) => (
                  <div
                    key={char.id}
                    className="border border-neutral-400 p-4 text-center rounded-lg space-y-1 bg-neutral-50"
                  >
                    <span className="text-xl">{char.avatarIcon}</span>
                    <p className="font-serif-title font-bold text-xs text-neutral-900">{char.name}</p>
                    <p className="text-[10px] text-neutral-600 font-story italic">{char.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Printable Section 2: Character Booklets */}
        {(selectedPrintMode === 'all' || selectedPrintMode === 'booklets') && (
          <div className="space-y-12">
            {characters.map((char, index) => (
              <div
                key={char.id}
                className="page-break space-y-6 border-b-2 border-neutral-300 pb-12 pt-6"
              >
                {/* Booklet Header */}
                <div className="flex items-start justify-between border-b-2 border-neutral-800 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                      Streng vertrauliches Rollenheft • Schloss Blackwood
                    </span>
                    <h2 className="text-2xl font-bold font-serif-title text-neutral-900 mt-1">
                      {char.name}
                    </h2>
                    <p className="text-sm font-semibold text-amber-800">{char.title}</p>
                  </div>
                  <span className="text-4xl">{char.avatarIcon}</span>
                </div>

                {/* Costume & Public Persona */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-neutral-100 rounded-lg border border-neutral-200">
                    <span className="font-bold block text-neutral-800 mb-1">
                      🎭 Kostüm-Empfehlung:
                    </span>
                    <p className="text-neutral-700">{char.costumeRecommendation}</p>
                  </div>
                  <div className="p-3.5 bg-neutral-100 rounded-lg border border-neutral-200">
                    <span className="font-bold block text-neutral-800 mb-1">
                      👥 Was alle über dich wissen:
                    </span>
                    <p className="text-neutral-700">{char.publicBio}</p>
                  </div>
                </div>

                {/* Secret Backstory */}
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg space-y-2">
                  <span className="text-xs font-mono font-bold uppercase text-rose-800 block">
                    🔒 DEINE GEHEIME VORGESCHICHTE (NIEMANDEM ZEIGEN!):
                  </span>
                  <p className="text-xs text-neutral-800 leading-relaxed font-story">
                    {char.secretBackstory}
                  </p>
                </div>

                {/* Rounds 1 to 3 Foldable Instructions */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-xs font-mono uppercase font-bold text-neutral-700">
                    Runden-Instruktionen (Erst aufdecken, wenn die jeweilige Runde beginnt):
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Round 1 */}
                    <div className="border border-neutral-300 p-3 rounded-lg text-xs space-y-2 bg-neutral-50">
                      <span className="font-bold text-neutral-900 block border-b border-neutral-200 pb-1">
                        Runde 1: Empfang (Vorspeise)
                      </span>
                      <p className="text-[11px] text-neutral-600">
                        <strong>Mission:</strong> {char.rounds.round1.secretMission}
                      </p>
                      <p className="text-[11px] text-rose-700">
                        <strong>Verberge:</strong> {char.rounds.round1.secretsToProtect[0]}
                      </p>
                    </div>

                    {/* Round 2 */}
                    <div className="border border-neutral-300 p-3 rounded-lg text-xs space-y-2 bg-neutral-50">
                      <span className="font-bold text-neutral-900 block border-b border-neutral-200 pb-1">
                        Runde 2: Kreuzverhör (Hauptgang)
                      </span>
                      <p className="text-[11px] text-neutral-600">
                        <strong>Mission:</strong> {char.rounds.round2.secretMission}
                      </p>
                      <p className="text-[11px] text-rose-700">
                        <strong>Verberge:</strong> {char.rounds.round2.secretsToProtect[0]}
                      </p>
                    </div>

                    {/* Round 3 */}
                    <div className="border border-neutral-300 p-3 rounded-lg text-xs space-y-2 bg-neutral-50">
                      <span className="font-bold text-neutral-900 block border-b border-neutral-200 pb-1">
                        Runde 3: Finale (Dessert)
                      </span>
                      <p className="text-[11px] text-neutral-600">
                        <strong>Mission:</strong> {char.rounds.round3.secretMission}
                      </p>
                      <p className="text-[11px] text-cyan-800">
                        <strong>Enthülle:</strong> {char.rounds.round3.publicRumorsToShare[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Printable Section 3: Sealed Solution Envelope */}
        {(selectedPrintMode === 'all' || selectedPrintMode === 'solution') && (
          <div className="page-break space-y-6 pt-6">
            <div className="border-4 border-dashed border-rose-800 p-8 rounded-xl text-center space-y-4 bg-rose-50/50">
              <span className="text-3xl">✉️</span>
              <h2 className="text-2xl font-bold font-serif-title uppercase text-rose-900 tracking-wider">
                Der versiegelte Lösungsumschlag
              </h2>
              <p className="text-xs font-mono text-neutral-600 uppercase">
                ⚠️ STRENG VERSIEGELT: ERST NACH DER ABSTIMMUNG ÖFFNEN!
              </p>

              <div className="pt-4 text-left space-y-4 max-w-xl mx-auto text-xs text-neutral-900 leading-relaxed font-story">
                <div className="p-4 bg-white rounded-lg border border-neutral-300">
                  <span className="font-bold font-sans text-rose-800 uppercase block mb-1">
                    Der Mörder:
                  </span>
                  <p className="text-sm font-bold text-neutral-900">
                    {mysteryCase.solution.killerName}
                  </p>
                  <p className="mt-1 text-neutral-700 italic">
                    {mysteryCase.solution.motive}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-lg border border-neutral-300 space-y-1">
                  <span className="font-bold font-sans text-neutral-800 uppercase block mb-1">
                    Das vollständige Geständnis:
                  </span>
                  <p className="italic text-neutral-800">
                    „{mysteryCase.solution.fullConfession}“
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
