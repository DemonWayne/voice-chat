'use strict';

const { Listener } = require('@sapphire/framework');
const Guild = require('../models/Guild');

module.exports = class extends Listener {
  async run(guild) {
    const guildDB = await Guild.findOne({ guildId: guild.id });
    if (guild && guildDB) {
      await Guild.deleteOne({ guildId: guild.id });
      this.container.logger.info(`${guild.name} removed from DataBase`);
    }
  }
};
