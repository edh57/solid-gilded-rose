import { Item } from './Item';
import { ItemSelection } from './ItemSelection';

export class GildedRose {
  items: Array<Item>;
  itemSelector: ItemSelection;

  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.itemSelector = new ItemSelection();
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const selectedItem = this.itemSelector.select(this.items[i].name, this.items[i]);
      selectedItem.tick();
    }

    return this.items;
  }
}
