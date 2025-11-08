export interface Vehicle {
  id: number;
  valstybiniaiNum: string;
  rida: number;
  vietuSk: number;
  kuroTipas: number; // or KuroTipas enum if you have it
}

export enum KuroTipas {
  Benzinas = 1,
  LPG = 2,
  Dyzelinas = 3,
  Elektra = 4
}