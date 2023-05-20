const Card = require('../../Card.js');

class ShockHerder extends Card {
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                controller: 'self',
                cardCondition: (card, context) => context.source.neighbors.includes(card),
                gameAction: ability.actions.sequential([
                    ability.actions.ready(),
                    ability.actions.fight()
                ])
            },
            effect: 'ready and fight with a neighboring creature'
        });
    }
}

ShockHerder.id = 'shock-herder';

module.exports = ShockHerder;
