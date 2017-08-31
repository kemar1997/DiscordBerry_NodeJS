const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class EmbedCommand extends Command {

	constructor(client) {
		super(client, {
			name: 'embed',
			group: 'random',
			memberName: 'embed',
			description: 'Embeds whatever text you provide the command',
			examples: ['embed Embeds are cool.'],
			args: [
                {
                    key: 'text',
                    prompt: 'What text would you like the bot to embed?',
                    type: 'string'
                }
            ]
			
		});
	}
	
	run(msg, args) {
		const { text } = args;
		const embed = new RichEmbed()
			.setDescription(text)
            .setAuthor(msg.author.username, msg.author.displayAvatarURL)
            .setColor(0x00AE86)
            .setTimestamp();
            
        const del = msg.delete()
			.then(msg => console.log(`Deleted message from ${msg.author}`))
			.catch(console.error);
            
        // Rendering the embed in the chat    
        return msg.embed(embed);
        
        // Deleting the initial message that created the embed
        return del;
	}
	
};
