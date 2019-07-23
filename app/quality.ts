import { Item } from './item';

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