import { Item, AGED_BRIE, BACKSTAGE_PASS, SULFURUS } from './item';
import {
    IQualityCalculator,
    QualityCalculatorFactory
} from './quality';

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        this.items.forEach(item => {
            const qualityCalculator = QualityCalculatorFactory.getQualityCalculator(item);
            qualityCalculator.adjustQuality(item);
        });

        return this.items;
    }
}
