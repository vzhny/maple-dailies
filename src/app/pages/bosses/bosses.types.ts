type BossFrequency = 'daily' | 'weekly' | 'monthly';
type BossDifficulty = 'easy' | 'normal' | 'hard' | 'chaos';
type BossAmountOperation = 'increment' | 'decrement';

interface Boss {
  name: string;
  difficulty: BossDifficulty;
  frequency: BossFrequency;
  perWeekAmount: number;
  bossCrystalMesos: number;
  selected: boolean;
  completed: boolean;
}

interface BossEvent {
  bossIndex: number;
  frequency: BossFrequency;
  perWeekAmount: number;
  bossCrystalMesos: number;
  selected: boolean;
}

interface BossSelectionEvent {
  bossIndex: number;
  frequency: BossFrequency;
  perWeekAmount: number;
  bossCrystalMesos: number;
  selected: boolean;
}

interface DailyBossAmountOperationEvent {
  bossIndex: number;
  perWeekAmount: number;
  bossCrystalMesos: number;
  operation: BossAmountOperation;
  selected: boolean;
}

interface BossCompletionEvent {
  isWeekly: boolean;
  bossIndex: number;
  completed: boolean;
}

interface AllBossesCompletionEvent {
  isWeekly: boolean;
  allCompleted: boolean;
}

interface BossesChecklists {
  characterId?: number;
  dailyBosses: Boss[];
  weeklyBosses: Boss[];
  monthlyBosses: Boss[];
  totalWeeklyMesos: number;
  totalAmountOfPowerCrystals: number;
}

export {
  BossFrequency,
  BossDifficulty,
  BossAmountOperation,
  Boss,
  BossEvent,
  BossSelectionEvent,
  DailyBossAmountOperationEvent,
  BossCompletionEvent,
  AllBossesCompletionEvent,
  BossesChecklists,
};
