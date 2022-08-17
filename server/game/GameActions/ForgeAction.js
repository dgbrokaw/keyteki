const PlayerAction = require('./PlayerAction');

class ForgeAction extends PlayerAction {
    setDefaultProperties() {
        this.modifier = 0;
        this.atNoCost = false;
    }

    setup() {
        super.setup();
        this.name = 'forgeKey';
        this.effectMsg = 'forge a key';
        this.effectArgs = this.modifier;
    }

    getModifier(player) {
        return this.atNoCost ? -player.getCurrentKeyCost() : this.modifier;
    }

    canAffect(player, context) {
        return player.canForgeKey(this.getModifier(player)) && super.canAffect(player, context);
    }

    defaultTargets(context) {
        return context.player;
    }

    getEvent(player, context) {
        return super.createEvent(
            'onForgeKey',
            { player: player, modifier: this.getModifier(player), context: context },
            (event) => {
                // TODO: add animation to game (could do it here or in the player method)
                event.amberSpent = event.player.forgeKey(event.modifier);
                event.context.game.addAnimation('player-to-supply', event.amberSpent);
            }
        );
    }
}

module.exports = ForgeAction;
