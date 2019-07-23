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
        if (item.name != AGED_BRIE && item.name != BACKSTAGE_PASS) {
            if (item.quality > 0) {
                if (item.name != SULFURUS) {
                    item.quality = item.quality - 1
                }
            }
        } else {
            if (item.quality < 50) {
                item.quality = item.quality + 1
                if (item.name == BACKSTAGE_PASS) {
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
            }
        }
        if (item.name != SULFURUS) {
            item.sellIn = item.sellIn - 1;
        }
        if (item.sellIn < 0) {
            if (item.name != AGED_BRIE) {
                if (item.name != BACKSTAGE_PASS) {
                    if (item.quality > 0) {
                        if (item.name != SULFURUS) {
                            item.quality = item.quality - 1
                        }
                    }
                } else {
                    item.quality = item.quality - item.quality
                }
            } else {
                if (item.quality < 50) {
                    item.quality = item.quality + 1
                }
            }
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
        for (let i = 0; i < this.items.length; i++) {
            const qualityCalculator = new GenericQualityCalculator();
            qualityCalculator.adjustQuality(this.items[i]);
        }

        return this.items;
    }
}
