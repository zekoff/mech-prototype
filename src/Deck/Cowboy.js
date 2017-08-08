/* global mech */
module.exports = [{
        title: "ATTACK",
        text: "Deal 1 damage.",
        value: 1,
        tint: 'red',
        copies: 8,
        action: function(amount) {
            mech.enemy.receiveDamage(amount);
        }
    },
    {
        title: "RELOAD",
        text: "FREE. Gain 2 stacks of Reload.",
        value: 1,
        tint: 'blue',
        copies: 2
    },
    {
        title: "OVERCHARGE",
        text: "FREE. Set all colors to max stacks this turn.",
        value: 1,
        tint: 'blue',
        copies: 2
    },
    {
        title: "HEAL",
        text: "Heal 1 damage.",
        value: 1,
        tint: 'green',
        copies: 3,
        action: function(amount) {
            mech.player.receiveHealing(amount);
        }
    },
    {
        title: "DODGE",
        text: "Avoid the next enemy attack completely.",
        value: 1,
        tint: 'green',
        copies: 2,
        action: function(amount) {
            mech.player.activateDodge(amount);
        }
    },
    {
        title: "HIGH NOON",
        text: "FREE. Double the attack power of every attack card played this turn.",
        value: 1,
        tint: 'red',
        copies: 1
    }
];
