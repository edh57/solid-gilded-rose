import { Default } from './Default';

export const AgedBreiRegexp = /^Aged Brie/i;

export class AgedBrie extends Default {
  constructor(item) { super(item); }

  updateQuality(amount: number) {
    this.item.quality += Math.abs(amount);
    if (this.item.sellIn === 0) this.item.quality += Math.abs(amount);
  }
}