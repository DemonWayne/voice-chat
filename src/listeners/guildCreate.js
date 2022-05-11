'use strict';

const { Listener } = require('@sapphire/framework');
const Guild = require('../models/Guild');

module.exports = class extends Listener {
  async run(guild) {
    const guildDB = await Guild.findOsne({ guildId: guild.id });
    if (guild && !guildDB) {
      await Guild.create({ guildId: guild.id });
      this.container.logger.info(`${guild.name} added to DataBase`);
    }
  }
};
