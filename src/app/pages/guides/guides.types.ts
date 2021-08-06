interface DailyInfo {
  name: string;
  exchangeFlag: boolean;
}

interface DailyInfoList {
  townName: string;
  canExchangeDailiesFlg: boolean;
  dailies: DailyInfo[];
}

interface MutoRecipeIngredient {
  name: string;
  amount: number;
}

interface MutoRecipe {
  name: string;
  ingredient1: MutoRecipeIngredient;
  ingredient2: MutoRecipeIngredient;
  ingredient3?: MutoRecipeIngredient;
  ingredient4?: MutoRecipeIngredient;
  canHaveHiddenIngredientsFlg: boolean;
}

interface TrainingMapsFiltersEvent {
  fromLevel: number | null;
  toLevel: number | null;
  minForceRequired: number | null;
  maxForceRequired: number | null;
  minRecommendedForceRequired: number | null;
  maxRecommendedForceRequired: number | null;
  popularity: number | null;
}

interface TrainingMap {
  level: number | null;
  name: string | null;
  area: string | null;
  minimumForce: number | null;
  recommendedForce: number | null;
  popularity: string | null;
}

interface GuildPointCapInfo {
  bossName: string;
  contributionPoints: number;
  iconFileName: string;
}

export { DailyInfo, DailyInfoList, MutoRecipeIngredient, MutoRecipe, TrainingMapsFiltersEvent, TrainingMap, GuildPointCapInfo };
