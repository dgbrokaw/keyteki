const Card = require('../../Card.js');

class SunkCost extends Card {
    // Play: Choose a house. Your opponent discards a random card from
    // their hand. If that card belongs to the chosen house, make a
    // token creature.
    setupCardAbilities(ability) {
        this.play({
            condition: (context) => !!context.player.opponent,
            target: {
                mode: 'house',
                houses: (context) => context.player.opponent.houses
            },
            effect: 'make a token creature if {1} randomly discards a card matching {2}',
            effectArgs: (context) => [context.player.opponent, context.house],
            effectAlert: true,
            gameAction: ability.actions.discardAtRandom(),
            then: (preThenContext) => ({
                gameAction: ability.actions.conditional({
                    condition: (context) =>
                        context.preThenEvent.cards.length > 0 &&
                        context.preThenEvent.cards[0].hasHouse(preThenContext.house),
                    trueGameAction: ability.actions.makeTokenCreature()
                })
            })
        });
    }
}

SunkCost.id = 'sunk-cost';

module.exports = SunkCost;
