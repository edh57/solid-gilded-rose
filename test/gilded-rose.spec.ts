import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('quality should not go negative', () => itemTest(new Item('foo', 0, 0), 0));
    it('quality should degrade', () => itemTest(new Item('foo', 30, 5), 4));
    it('quality should not go negative (2)', () => itemTest(new Item('foo', -1, 0), 0));


    describe('When the sell by date has passed', () => {
        it('Quality degrades twice as fast', () => itemTest(new Item('foo', -1, 5), 3));
    });

    describe('Aged Brie', () => {
        it('increases in quality the older it gets', () => itemTest(new Item('Aged Brie', 30, 5), 6));
        it('increases even after sellIn', () => itemTest(new Item('Aged Brie', -2, 5), 7));
        it('quality is never more than 50', () => itemTest(new Item('Aged Brie', 5, 50), 50));
    });

    describe('Sulfuras', () => {
        it('never decreases in quality', () => itemTest(new Item('Sulfuras, Hand of Ragnaros', 5, 45), 45));
        it('never has to be sold', () => itemTest(new Item('Sulfuras, Hand of Ragnaros', 5, 45), 45, 5));
        it('never has to be sold', () => itemTest(new Item('Sulfuras, Hand of Ragnaros', -1, 45), 45, -1));
    });

    describe('Backstage passes', () => {
        it('increases in quality the older it gets', () => {
            itemTest(new Item('Backstage passes to a TAFKAL80ETC concert', 30, 5), 6);
        });

        it('cannot go higher than 50', () => {
            itemTest(new Item('Backstage passes to a TAFKAL80ETC concert', 30, 50), 50);
            itemTest(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 50), 50);
            itemTest(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 50), 50);
        });

        it('increases by 2 when there are 10 days or less', () => {
            itemTest(new Item('Backstage passes to a TAFKAL80ETC concert', 9, 5), 7);
        });

        it('increases by 3 when there are 5 days or less', () => {
            itemTest(new Item('Backstage passes to a TAFKAL80ETC concert', 4, 5), 8);
        });

        it('drops to 0 after the concert', () => {
            itemTest(new Item('Backstage passes to a TAFKAL80ETC concert', 0, 5), 0);
        });
    });

    describe('Conjured items', () => {
      it('Quality degrades twice as fast', () => itemTest(new Item('Conjured Mana Cake', 3, 6), 4));
    });
});

function itemTest(item: Item, expectedQuality: Number, expectedSellIn? : Number) {
    const gildedRose = new GildedRose([ item ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(expectedQuality);
    if (expectedSellIn) {
        expect(items[0].sellIn).to.equal(expectedSellIn);
    }
}
