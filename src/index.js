'use strict';
require('dotenv').config();
require('@sapphire/plugin-logger/register');
const { client } = require('./structures/Client');

new client().login();
