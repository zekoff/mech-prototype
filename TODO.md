# TODO

- Make enemy components targetable specifically
- Add enemy scripting and abilities

# BUGS

- Deck-building loop is destructive on the deck you pass in, so if you win the game and restart it will get caught in an endless loop. This is because the deck building loop tries to build from the deck you destroyed on your first play, so it has no cards. Then the card-drawing code tries to draw from an empty draw pile, so it tries to reshuffle an empty discard pile and then draw from it...
- If you play another card before the first one resolves, and you have enough stacks of reload, you'll get a hand filled with more than 5 cards.
- Choosing the same target while component tinting tween is still playing will leave the component discolored as the old tween stops and the new tween picks the current tint value to return to when it's done.