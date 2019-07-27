import { Item } from '../Item';

export const DefaultRegexp = /^.*$/;

export class Default {
  item: Item;
  maxQuality: number;

  constructor(item, maxQuality = 50) {
    this.item = item;
    this.maxQuality = maxQuality;
  }

  tick() {
    this.updateSellIn(-1);
    this.updateQuality(-1);

    if (this.item.quality < 0)  this.item.quality = 0;
    if (this.item.quality > this.maxQuality) this.item.quality = this.maxQuality;
  }

  updateSellIn(amount: number) {
    this.item.sellIn += amount;
    if (this.item.sellIn < 0) this.item.sellIn = 0;
  }

  updateQuality(amount: number) {
    this.item.quality += amount;
    if (this.item.sellIn === 0) this.item.quality += amount;
  }
}