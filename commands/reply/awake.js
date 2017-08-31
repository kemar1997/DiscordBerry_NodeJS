const commando = require('discord.js-commando');

class ReplyCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'reply',
			group: 'reply',
			memberName: 'reply',
			description: 'Replies with a funny sentence'
		});
	}
	
	run(msg) {
		var awake = "Hello everyone my name is DiscordBerry, here to assist and cause havoc only when necessary :grinning:";
		msg.say(awake);
	}
} 

module.exports = ReplyCommand;
