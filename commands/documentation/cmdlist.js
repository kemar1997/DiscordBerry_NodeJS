const commando = require('discord.js-commando');
const cmdlist_msg = require('./message.json');

class CMDListCommand extends commando.Command {
	constructor(client) {
		super(client, {
                        name: 'cmdlist',
                        group: 'documentation',
                        memberName: 'cmdlist',
                        description: 'Supplies the user with all of the commands of the bot'
                });
        }

        // Creating a reference to all of the bots commands then outputting it to the user
        run(msg) {
                msg.say(cmdlist_msg.cmd);
        }
}

module.exports = CMDListCommand;
