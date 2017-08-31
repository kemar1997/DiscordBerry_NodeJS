const { Command } = require('discord.js-commando');

module.exports = class HelloCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hello',
			aliases: ['hi', 'hey'],
			description: 'sends a simple message',
			group: 'random',
			memberName: 'hello'
		});
	}
	
	run(msg) {
		const del = msg.delete()
			.then(msg => console.log(`Deleted message from ${msg.author}`))
			.catch(console.error);
			
		// Responding to the command
		msg.reply("Hello from DiscordBerry, hope you're having a great day");
		
		// Removing the command message since it can get repetitive...
		return del;
	}
};
