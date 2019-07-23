import { Item, AGED_BRIE, BACKSTAGE_PASS, SULFURUS } from './item';
import {
    IQualityCalculator,
    AgedBrieQualityCalculator,
    BackstagePassQualityCalculator,
    GenericQualityCalculator,
    SulfurusQualityCalculator
} from './quality';

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
