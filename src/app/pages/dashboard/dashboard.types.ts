import { BossesChecklists } from '../bosses/bosses.types';
import { DailyList } from '../dailies/dailies.types';
import { CharacterInfo } from '../settings/settings.types';

interface CharacterBossesChecklistsTuple {
  character: CharacterInfo;
  bossesChecklists: BossesChecklists;
}

interface CharacterDailiesListsTuple {
  character: CharacterInfo;
  dailiesLists: DailyList[];
}

interface DashboardFilters {
  characterIds: number[];
  showDailies: boolean;
  showBosses: boolean;
  showArcaneDailiesInfo: boolean;
  showHardMutoRecipes: boolean;
}

export { CharacterBossesChecklistsTuple, CharacterDailiesListsTuple, DashboardFilters };
