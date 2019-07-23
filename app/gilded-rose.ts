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

export interface IQualityCalculator {
    adjustQuality(item: Item);
}

export class GenericQualityCalculator {
    adjustQuality(item: Item) {

        if (item.quality > 0) {
            item.quality = item.quality - 1
        }
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
            if (item.quality > 0) {
                item.quality = item.quality - 1
            }
        }
    }
}

export class SulfurusQualityCalculator implements IQualityCalculator {
    adjustQuality(item: Item) {
        // Do nothing
    }
}

export class AgedBrieQualityCalculator implements IQualityCalculator {
    adjustQuality(item: Item) {
        if (item.quality < 50) {
            item.quality = item.quality + 1;
        }
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
            if (item.quality < 50) {
                item.quality = item.quality + 1
            }
        }
    }
}

export class BackstagePassQualityCalculator implements IQualityCalculator {
    adjustQuality(item: Item) {
        if (item.quality < 50) {
            item.quality = item.quality + 1
            if (item.sellIn < 11) {
                if (item.quality < 50) {
                    item.quality = item.quality + 1
                }
            }
            if (item.sellIn < 6) {
                if (item.quality < 50) {
                    item.quality = item.quality + 1
                }
            }
        }
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
            item.quality = item.quality - item.quality
        }
    }
}

export const AGED_BRIE = 'Aged Brie';
export const BACKSTAGE_PASS = 'Backstage passes to a TAFKAL80ETC concert';
export const SULFURUS = 'Sulfuras, Hand of Ragnaros';

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        this.items.forEach(item => {
            let qualityCalculator: IQualityCalculator;
            if (item.name === AGED_BRIE) {
                qualityCalculator = new AgedBrieQualityCalculator();
            } else if (item.name === BACKSTAGE_PASS) {
                qualityCalculator = new BackstagePassQualityCalculator();
            } else if (item.name == SULFURUS) {
                qualityCalculator = new SulfurusQualityCalculator();
            } else {
                qualityCalculator = new GenericQualityCalculator();
            }
            qualityCalculator.adjustQuality(item);
        });

        return this.items;
    }
}
