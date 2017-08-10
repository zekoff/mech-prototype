# TODO

- Add abilities for different enemy components
- Make enemy components targetable specifically
- Add enemy scripting and abilities
- Add visual indicators of card color stacks

# BUGS

- Deck-building loop is destructive on the deck you pass in, so if you win the game and restart it will get caught in an endless loop. This is because the deck building loop tries to build from the deck you destroyed on your first play, so it has no cards. Then the card-drawing code tries to draw from an empty draw pile, so it tries to reshuffle an empty discard pile and then draw from it...
- If you play another card before the first one resolves, and you have enough stacks of reload, you'll get a hand filled with more than 5 cards.
- Choosing the same target while component tinting tween is still playing will leave the component discolored as the old tween stops and the new tween picks the current tint value to return to when it's done.
- If something strange happens with a pointer event when a card is being dragged from the hand (and this is bigger and a little translucent) it won't go back to normal when it returns to the discard pile.
- Queueing up multiple cards that sit on top of the enemy waiting for their turn to resolve causes all kinds of problems. Another thing that can happen is that the game's logic for reshuffling the discard pile gets out of order, and it tries to draw from an empty draw pile and flip the card, which crashes the game. Or it can fill up your hand with tons of cards and forget to flip them over.