const {Client, Collection} = require("discord.js");

module.exports = class shitbot extends Client {
  constructor(options) {
    super(options)
    
    this.commands = new Collection(); 
    this.cooldowns = new Collection(); 
    this.aliases = new Collection(); 
    this.config = require('../config.json');
    this.recent = new Set();
  }
}
