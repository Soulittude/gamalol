export interface MajorRunesI extends Slot {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: Slot[];
}

export interface Slot extends Rune{
  runes: Rune[];
}

export interface Rune {
  id: number;
  key: string;
  icon: string;
  name: string;
  shortDesc: string;
  longDesc: string;
}
