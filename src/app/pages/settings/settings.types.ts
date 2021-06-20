interface ArcaneSymbol {
  currentLevel: number;
  currentExp: number;
}

interface CharacterInfo {
  id: number;
  level: number;
  class: string;
  characterName: string;
  characterImgSrcUrl: string;
  vanishingJourneyArcaneSymbol: ArcaneSymbol;
  chuChuIslandArcaneSymbol: ArcaneSymbol;
  lacheleinArcaneSymbol: ArcaneSymbol;
  arcanaArcaneSymbol: ArcaneSymbol;
  morassArcaneSymbol: ArcaneSymbol;
  esferaArcaneSymbol: ArcaneSymbol;
}

export { ArcaneSymbol, CharacterInfo };
