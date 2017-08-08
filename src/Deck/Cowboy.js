/* global mech */
module.exports = [{
        title: "ATTACK",
        text: "Deal 1 damage.",
        cost: 1,
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
        cost: 0,
        value: 1,
        tint: 'blue',
        copies: 2,
        action: function(amount) {
            mech.player.activateReload(amount);
        }
    },
    {
        title: "OVERCHARGE",
        text: "FREE. Set all colors to max stacks this turn.",
        cost: 0,
        value: 1,
        tint: 'blue',
        copies: 2,
        action: function(amount) {
            mech.player.activateOvercharge(amount);
        }
    },
    {
        title: "HEAL",
        text: "Heal 1 damage.",
        cost: 1,
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
        cost: 1,
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
        cost: 0,
        value: 1,
        tint: 'red',
        copies: 1,
        action: function(amount) {
            mech.player.setHighNoon(true);
        }
    }
];
