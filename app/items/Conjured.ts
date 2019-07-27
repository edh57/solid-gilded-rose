import { Default } from './Default';

export const ConjuredRegexp = /^Conjured/i;

export class Conjured extends Default {
  constructor(item) { super(item); }

  updateQuality(amount: number) {
    this.item.quality = this.item.quality + amount + amount;
  }
}