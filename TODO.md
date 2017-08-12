# TODO

- String multiple battles together back-to-back
- Add junk cards to player deck at various damage levels; make deck persist between battles
- Add sound effects
- Add once-per-shuffle ability

# BUGS

- If you play another card before the first one resolves, and you have enough stacks of reload, you'll get a hand filled with more than 5 cards.
- Choosing the same target while component tinting tween is still playing will leave the component discolored as the old tween stops and the new tween picks the current tint value to return to when it's done.
- If something strange happens with a pointer event when a card is being dragged from the hand (and this is bigger and a little translucent) it won't go back to normal when it returns to the discard pile.
- Queueing up multiple cards that sit on top of the enemy waiting for their turn to resolve causes all kinds of problems. Another thing that can happen is that the game's logic for reshuffling the discard pile gets out of order, and it tries to draw from an empty draw pile and flip the card, which crashes the game. Or it can fill up your hand with tons of cards and forget to flip them over.
- If you play a Reload card and need to draw 2 cards, but only have 1 in the draw pile, the game's not smart enough to realize you need to reshuffle again before drawing. It's actually caused because two separate card draw tweens get registered. The first card draw tween runs and then queues a reshuffle, but it gets added to the queue after the extra card draw that had already been queued.