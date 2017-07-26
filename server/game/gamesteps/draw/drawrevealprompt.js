const UiPrompt = require('../uiprompt.js');

class DrawRevealPrompt extends UiPrompt {
    constructor(game, player) {
        super(game);
        this.player = player;
    }

    activeCondition(player) {
        return this.player === player;
    }

    activePrompt() {
        return {
            menuTitle: 'Bids have been revealed',
            buttons: [
                { text: 'Done' }
            ]
        };
    }

    waitingPrompt() {
        return { menuTitle: 'Waiting for opponent to finish.' };
    }

    onMenuCommand(player, bid) {
        if(this.player !== player) {
            return false;
        }

        this.game.addMessage('{0} is done.', player);

        this.complete();
    }
}

module.exports = DrawRevealPrompt;
