const commando = require('discord.js-commando');
const doc_msg = require('./message.json');

class DocCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'doc',
			group: 'documentation',
			memberName: 'doc',
			description: 'Supplies the user with more details of this bot'
		});
	}
	
	// Sending out the documentation message to the user who calls this
	// command.
	run(msg) {
		msg.say(doc_msg.msg);
	}
}

module.exports = DocCommand;
