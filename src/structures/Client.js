'use strict';

const { SapphireClient } = require('@sapphire/framework');
const mongoose = require('mongoose');

exports.client = class extends SapphireClient {
  constructor() {
    super({
      disableMentionPrefix: true,
      defaultPrefix: '/',
      intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'],
    });
  }

  connectDatabase() {
    mongoose.connect(
      process.env.DATABASE_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      err => {
        if (err) throw err;
        this.logger.info('[Database] MongoDB connected successfully.');
      },
    );
  }

  login() {
    this.connectDatabase();
    return super.login(process.env.DISCORD_TOKEN);
  }
};
