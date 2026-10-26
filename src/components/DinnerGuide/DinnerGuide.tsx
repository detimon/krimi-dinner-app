import React, { useState } from 'react';
import { DinnerCourse } from '../../types';
import {
  Utensils,
  Clock,
  Wine,
  Leaf,
  CheckSquare,
  Square,
  ChefHat,
  Sparkles,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface DinnerGuideProps {
  courses: DinnerCourse[];
}

export const DinnerGuide: React.FC<DinnerGuideProps> = ({ courses }) => {
  const [isDinnerModuleEnabled, setIsDinnerModuleEnabled] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (id: string) => {
    setCompletedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header & Feature Toggle */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/30 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <ChefHat className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              KULINARISCHE STORY-INTEGRATION
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-title text-neutral-100">
            Das Schloss-Blackwood 3-Gänge-Menü
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl font-story">
            Speisen, die perfekt zur viktorianischen Epoche passen und zu 90 % im Voraus zubereitet
            werden können – damit der Gastgeber mitspielen kann, statt in der Küche zu stehen!
          </p>
        </div>

        {/* Modular On/Off Switch */}
        <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex items-center gap-4">
          <div>
            <p className="text-xs font-bold text-neutral-200">Dinner-Modul:</p>
            <p className="text-[11px] text-neutral-400">
              {isDinnerModuleEnabled ? 'Aktiv (mit Menü)' : 'Deaktiviert (nur Krimi / Pizza)'}
            </p>
          </div>
          <button
            onClick={() => setIsDinnerModuleEnabled(!isDinnerModuleEnabled)}
            className="text-amber-500 hover:text-amber-400 transition-all"
            title="Dinner-Modul an- oder ausschalten"
          >
            {isDinnerModuleEnabled ? (
              <ToggleRight className="w-9 h-9" />
            ) : (
              <ToggleLeft className="w-9 h-9 text-neutral-600" />
            )}
          </button>
        </div>
      </div>

      {!isDinnerModuleEnabled ? (
        <div className="p-12 text-center bg-neutral-900/50 border border-dashed border-neutral-800 rounded-2xl space-y-3">
          <Utensils className="w-12 h-12 text-neutral-600 mx-auto" />
          <h3 className="text-base font-semibold text-neutral-300">
            Das Dinner-Modul ist derzeit pausiert
          </h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            Ihr könnt den Krimi ganz ohne Essen spielen oder einfach Pizza / Fingerfood bestellen.
            Aktiviere den Schalter oben rechts jederzeit wieder, um Rezepte und Timing einzublenden.
          </p>
        </div>
      ) : (
        <>
          {/* Host Stress-Free Timing Calculator */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-2xl space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>Vorbereitung (Vortag/Mittag)</span>
              </span>
              <p className="text-2xl font-bold font-mono text-neutral-100">~60–75 Min</p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Alles in Ruhe vorbereiten, einkochen und kaltstellen. Kein Stress am Abend!
              </p>
            </div>

            <div className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-2xl space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                <ChefHat className="w-4 h-4" />
                <span>Aktive Zeit am Abend</span>
              </span>
              <p className="text-2xl font-bold font-mono text-emerald-300">&lt; 10 Min gesamt</p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Maximal 3–5 Minuten pro Gang: Nur aufwärmen, Teller anrichten und servieren.
              </p>
            </div>

            <div className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-2xl space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Story-Synchronisation</span>
              </span>
              <p className="text-2xl font-bold font-mono text-amber-300">100 % passend</p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Der Giftmord geschieht mit dem Sherry nach der Suppe. Niemand verpasst eine Szene!
              </p>
            </div>
          </div>

          {/* 3 Courses Detail Cards */}
          <div className="space-y-6">
            {courses.map((course) => (
              <div
                key={course.courseNumber}
                className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-7 space-y-6 shadow-xl"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">
                      GANG {course.courseNumber} • {course.courseTitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif-title text-neutral-100 mt-1">
                      {course.dishName}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 font-mono">
                      ⏱️ Aktiv: {course.hostActiveTimeDinner}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-neutral-300 font-story italic leading-relaxed">
                  {course.dishDescription}
                </p>

                {/* Vegetarian & Pairing info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800/80 flex items-start gap-2.5">
                    <Leaf className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-emerald-400 block mb-0.5">
                        Vegetarische Alternative:
                      </span>
                      <span className="text-neutral-300">{course.vegetarianAlternative}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800/80 flex items-start gap-2.5">
                    <Wine className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-rose-400 block mb-0.5">
                        Getränke-Empfehlung:
                      </span>
                      <span className="text-neutral-300">{course.drinksPairing}</span>
                    </div>
                  </div>
                </div>

                {/* Prep Steps & Live Service Checklist */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                    <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold">
                      Im Vorfeld vorbereiten ({course.prepTimeInAdvance}):
                    </h4>
                    <div className="space-y-2">
                      {course.advancePrepInstructions.map((step, idx) => {
                        const stepId = `c${course.courseNumber}_prep_${idx}`;
                        const isDone = !!completedSteps[stepId];
                        return (
                          <button
                            key={idx}
                            onClick={() => toggleStep(stepId)}
                            className="flex items-start gap-2 text-left text-xs text-neutral-300 hover:text-white transition-all w-full"
                          >
                            {isDone ? (
                              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <Square className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                            )}
                            <span className={isDone ? 'line-through text-neutral-500' : ''}>
                              {step}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                    <h4 className="text-xs font-mono uppercase text-amber-400 font-bold">
                      Kurz vor dem Servieren ({course.hostActiveTimeDinner}):
                    </h4>
                    <div className="space-y-2">
                      {course.liveServiceInstructions.map((step, idx) => {
                        const stepId = `c${course.courseNumber}_live_${idx}`;
                        const isDone = !!completedSteps[stepId];
                        return (
                          <button
                            key={idx}
                            onClick={() => toggleStep(stepId)}
                            className="flex items-start gap-2 text-left text-xs text-neutral-300 hover:text-white transition-all w-full"
                          >
                            {isDone ? (
                              <CheckSquare className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            ) : (
                              <Square className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                            )}
                            <span className={isDone ? 'line-through text-neutral-500' : ''}>
                              {step}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Story synchronization note */}
                <div className="p-3 bg-amber-950/20 border border-amber-900/30 rounded-xl text-xs text-amber-300/90 flex items-center gap-2">
                  <span>📖</span>
                  <span><strong>Story-Timing:</strong> {course.storySynchronization}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
