'use strict';

const { Listener } = require('@sapphire/framework');
const Guild = require('../models/Guild');

module.exports = class extends Listener {
  async run(message) {
    const guild = await Guild.findOne({ guildId: message.guild?.id });
    if (message.guild && !guild) {
      await Guild.create({ guildId: message.guild.id });
      this.container.logger.info(`${message.guild.name} added to DataBase`);
    }
  }
};
