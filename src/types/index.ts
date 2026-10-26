export type CharacterStatus = 'active' | 'absent' | 'arriving_late' | 'leaving_early' | 'npc';

export interface CharacterRoundInfo {
  secretsToProtect: string[];
  publicRumorsToShare: string[];
  secretMission: string;
  revealsThisRound?: string[];
}

export interface Character {
  id: string;
  name: string;
  title: string;
  age: number;
  relationToVictim: string;
  avatarIcon: string;
  isCore: boolean;
  isMurderer: boolean;
  costumeRecommendation: string;
  publicBio: string;
  secretBackstory: string;
  motives: string[];
  status: CharacterStatus;
  fallbackNpcLetter?: string; // If player is sick, read this letter/document instead!
  rounds: {
    round1: CharacterRoundInfo;
    round2: CharacterRoundInfo;
    round3: CharacterRoundInfo;
  };
}

export interface Clue {
  id: string;
  title: string;
  type: 'document' | 'audio' | 'forensic' | 'physical' | 'testimony';
  round: number;
  foundLocation: string;
  teaser: string;
  detailedContent: string;
  audioSimulatedUrl?: string;
  audioTranscript?: string;
  belongsToCharacterId?: string;
  isRevealed: boolean;
}

export interface DinnerCourse {
  courseNumber: number;
  courseTitle: string; // "Vorspeise", "Hauptgang", "Dessert"
  dishName: string;
  dishDescription: string;
  vegetarianAlternative: string;
  drinksPairing: string;
  prepTimeInAdvance: string; // e.g. "Vortag: 45 Min"
  hostActiveTimeDinner: string; // e.g. "3 Minuten (nur Teller erwärmen und anrichten)"
  advancePrepInstructions: string[];
  liveServiceInstructions: string[];
  storySynchronization: string;
}

export interface MysteryCase {
  id: string;
  title: string;
  tagline: string;
  period: string;
  location: string;
  playerCount: { min: number; max: number; recommended: number };
  durationMinutes: number;
  atmosphereDescription: string;
  victim: {
    name: string;
    title: string;
    portrait: string;
    timeOfDeath: string;
    foundLocation: string;
    causeOfDeath: string;
    lastSeen: string;
    overview: string;
  };
  characters: Character[];
  clues: Clue[];
  dinnerMenu: DinnerCourse[];
  solution: {
    killerId: string;
    killerName: string;
    motive: string;
    execution: string;
    chronology: { time: string; event: string; actor: string }[];
    fullConfession: string;
  };
}

export type ViewMode = 'host' | 'player' | 'dinner' | 'print' | 'editor';

export type GameStage = 
  | 'setup'              // Host selects players, roles, meal toggles
  | 'prologue'           // Reading the introduction & atmosphere
  | 'round1_reception'   // Appetizer & icebreaker, secret introductions
  | 'murder_reveal'      // The dramatic murder! Audio stinger & forensic discovery
  | 'round2_alibis'      // Main course & tough cross-examinations
  | 'round3_climax'      // Dessert, new forensic clues & confessions
  | 'accusation'         // Secret voting
  | 'epilogue';          // Final solution & victory celebration
