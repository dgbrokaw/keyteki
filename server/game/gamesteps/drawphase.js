const _ = require('underscore');
const Phase = require('./phase.js');
const SimpleStep = require('./simplestep.js');
const DrawBidPrompt = require('./draw/drawbidprompt.js');
const DrawRevealPrompt = require('./draw/drawrevealprompt.js');

class DrawPhase extends Phase {
    constructor(game) {
        super(game, 'draw');
        this.initialise([
            new SimpleStep(game, () => this.bidPrompt()),
            new SimpleStep(game, () => this.showBids()),
            new SimpleStep(game, () => this.tradeHonor()),
            new SimpleStep(game, () => this.drawConflict())
        ]);
    }

    bidPrompt() {
        _.each(this.game.getPlayers(), p => {
            this.game.raiseEvent('beginDrawPhase', this, p);
            this.queueStep(new DrawBidPrompt(this.game, p));
        });
    }

    showBids() {


        _.each(this.game.getPlayers(), p => {
            this.queueStep(new DrawRevealPrompt(this.game, p));
        });
    }

    tradeHonor() {

    }

    drawConflict() {
        _.each(this.game.getPlayers(), p => {
            this.game.raiseEvent('beginDrawPhase', this, p);
            p.drawPhase();
        });
    }
}

module.exports = DrawPhase;
