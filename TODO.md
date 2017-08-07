# TODO

- Create card activation actions (perhaps in the card/deck definition file)

# BUGS

- Deck-building loop is destructive on the deck you pass in, so if you win the game and restart it will get caught in an endless loop. This is because the deck building loop tries to build from the deck you destroyed on your first play, so it has no cards. Then the card-drawing code tries to draw from an empty draw pile, so it tries to reshuffle an empty discard pile and then draw from it...