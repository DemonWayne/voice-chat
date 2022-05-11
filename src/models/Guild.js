'use strict';

const { Schema, model } = require('mongoose');

const GuildSchema = new Schema(
  {
    guildId: { type: String, required: true },
    // Type: roles or permissions
    type: { type: String, default: 'roles' },
    // First - channel: id, if type roles in object: roles: [], if permissions: chat: 'text_channel_id', permissions: []
    voices: { type: [Object], default: [{}] },
  },
  { versionKey: false },
);

module.exports = model('Guild', GuildSchema);
