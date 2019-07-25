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

class GenericItem {
  item: Item;
  constructor(item) { this.item = item; }

  tick() {
    this.updateSellIn(-1);

    this.updateQuality(-1);

    if (this.item.quality < 0)  this.item.quality = 0;
    if (this.item.quality > 50) this.item.quality = 50;
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

class AgedBrieItem extends GenericItem {
  constructor(item) { super(item); }

  updateQuality(amount: number) {
    this.item.quality += Math.abs(amount);
    if (this.item.sellIn === 0) this.item.quality += Math.abs(amount);
  }
}

class SulfurasItem extends GenericItem {
  constructor(item) { super(item); }
  updateSellIn(amount: number) {}
  updateQuality(amount: number) {}
}

class BackstagePass extends GenericItem {
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

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  typeOfItem(item) {
    if (/^Aged Brie/i.test(item.name)) {
      return new AgedBrieItem(item);
    } else if (/^Sulfuras/i.test(item.name)) {
      return new SulfurasItem(item);
    } else if (/^Backstage pass/i.test(item.name)) {
      return new BackstagePass(item);
    } else {
      return new GenericItem(item);
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.typeOfItem(this.items[i]).tick();
    }

    return this.items;
  }
}
