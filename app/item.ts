export const AGED_BRIE = 'Aged Brie';
export const BACKSTAGE_PASS = 'Backstage passes to a TAFKAL80ETC concert';
export const SULFURUS = 'Sulfuras, Hand of Ragnaros';

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
      this.name = name;
      this.sellIn = sellIn;
      this.quality = quality;
  }
}