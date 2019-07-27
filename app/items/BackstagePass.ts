import { Default } from './Default';

export const BackstagePassRegexp = /^Backstage pass/i;

export class BackstagePass extends Default {
  constructor(item) { super(item); }

  updateQuality(amount: number) {
    if (this.item.sellIn === 0) {
      this.item.quality = 0;
    } else if (this.item.sellIn <= 5) {
      this.item.quality += 3;
    } else if (this.item.sellIn <= 10) {
      this.item.quality += 2;
    } else {
      this.item.quality += 1;
    }
  }
}