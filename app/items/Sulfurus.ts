import { Default } from './Default';

export const SulfurusRegexp = /^Sulfuras/i;

export class Sulfuras extends Default {
  constructor(item) { super(item, 80); }

  updateSellIn(amount: number) {}
  updateQuality(amount: number) {}
}