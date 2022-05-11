'use strict';

const { Listener } = require('@sapphire/framework');

module.exports = class extends Listener {
  run(oldState, newState) {
    require('../controllers/voiceController').handleVoiceState(this.container.client, oldState, newState);
  }
};
