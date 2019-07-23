import { Item, AGED_BRIE, BACKSTAGE_PASS, SULFURUS } from './item';


export class QualityCalculatorFactory {
  static getQualityCalculator(item: Item): IQualityCalculator {
    switch (item.name) {
      case AGED_BRIE:
        return new AgedBrieQualityCalculator();
      case BACKSTAGE_PASS:
        return new BackstagePassQualityCalculator();
      case SULFURUS:
        return new SulfurusQualityCalculator();
      default:
        return new GenericQualityCalculator();
    }
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