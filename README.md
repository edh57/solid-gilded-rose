# SOLID Gilded Rose

This is my attempt at working through the Gilded Rose kata. Original Kata found at
https://github.com/emilybache/GildedRose-Refactoring-Kata. Each step of my process will be a commit.

*steps before refactoring* - Create enough tests based on the specification that cover all lines of
existing code. This gives us a good "green" case to make sure we stay within. Any breaking tests should
be indicators of changes in functionality.

*first_refactor* - Simple refactor to take care of pulling repeated strings into variables. Not really
solid, just something basic to get out of the way.

*second_refactor* - The `GildedRose.updateQuality` is certainly the main target of the refactors. The method
is itself very high in complexity, with multiple branches in multiple loops based on item names. Any additional
names that are added to this will simply continue to increase the complexity, and changes to one item's rules
could very well break other items. In this way, it violates the Dependency Inversion Principle in that it is
tightly coupled with concretions of the "Item" class. My first attempt is going to be to create further Item
types that know how to calculate their own quality. Part of my brain says this voilates the Single Responsibility
Principle, but we'll get to that one.

Hit the problem with that one, that I ended up having to use something other than an Item, and extending that in
weird ways, which I did not like. So the SRP violation that was tickling my brain had me go a different direction,
and create an sepearate class for analyzing the quality of an item.

Something I hadn't noticed, was that our code was also modifying the sellIn date with every iteration. Suppose I
should have figured that out from some of the tests. Seems like an SRP violation there.

Extracted all the item-type logic to their own QualityCalculator objects. Have a structure that looks like a factory
in there, so I'll move that in the next refactor.


## Gilded Rose Requirements Specification

Hi and welcome to team Gilded Rose. As you know, we are a small inn with a prime location in a
prominent city ran by a friendly innkeeper named Allison. We also buy and sell only the finest goods.
Unfortunately, our goods are constantly degrading in quality as they approach their sell by date. We
have a system in place that updates our inventory for us. It was developed by a no-nonsense type named
Leeroy, who has moved on to new adventures. Your task is to add the new feature to our system so that
we can begin selling a new category of items. First an introduction to our system:

- All items have a SellIn value which denotes the number of days we have to sell the item
- All items have a Quality value which denotes how valuable the item is
- At the end of each day our system lowers both values for every item

Pretty simple, right? Well this is where it gets interesting:

- Once the sell by date has passed, Quality degrades twice as fast
- The Quality of an item is never negative
- "Aged Brie" actually increases in Quality the older it gets
- The Quality of an item is never more than 50
- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
Quality drops to 0 after the concert

We have recently signed a supplier of conjured items. This requires an update to our system:

- "Conjured" items degrade in Quality twice as fast as normal items

Feel free to make any changes to the UpdateQuality method and add any new code as long as everything
still works correctly. However, do not alter the Item class or Items property as those belong to the
goblin in the corner who will insta-rage and one-shot you as he doesn't believe in shared code
ownership (you can make the UpdateQuality method and Items property static if you like, we'll cover
for you).

Just for clarification, an item can never have its Quality increase above 50, however "Sulfuras" is a
legendary item and as such its Quality is 80 and it never alters.
