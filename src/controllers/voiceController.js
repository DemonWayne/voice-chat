'use strict';

const Guild = require('../models/Guild');

exports.handleVoiceState = async (client, oldState, newState) => {
  try {
    const {
      guild: { id: gulidId },
      member: { roles, id: memberId },
    } = oldState || newState;

    const { voices = [], type } = await Guild.findOne({ gulidId });
    const channel = voices.find(({ channel: ch }) => ch === oldState.channel?.id || ch === newState.channel?.id);
    if (!channel) return;

    if (type === 'roles' && oldState.channel) roles.remove(...channel.roles);
    else if (type === 'roles' && newState.channel) roles.add(...channel.roles);

    if (type === 'permissions') {
      const chat = client.channels.cache.get(channel.chat);
      const permissions = Object.fromEntries(channel.permissions.map(permission => [permission, true]));
      chat.permissionOverwrites[oldState.channel ? 'delete' : 'create'](memberId, permissions);
    }
  } catch (err) {
    console.error(err);
  }
};
