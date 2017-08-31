const commando = require('discord.js-commando');
const client = new commando.Client({
	owner: '276233346286092291'
});
const clientSettings = require('./clientsettings.json');
const jokes = require('./jokes.json');

var resArray = [jokes.j1, jokes.j2, jokes.j3, jokes.j4, jokes.j5, jokes.j6, jokes.j7, jokes.j8, jokes.j9];


resArray[Math.floor(Math.random() * resArray.length)];


client.on('ready', () => {
	console.log('I am ready!');
});

// Registering all the groups containing different commands (keeps commands organized and more accesible)
client.registry.registerGroup('random', 'Random');
client.registry.registerGroup('documentation', 'Documentation');
client.registry.registerGroup('reply', 'Reply');
client.registry.registerDefaults();
client.registry.registerCommandsIn(__dirname + '/commands');

client.on('message', (msg) => {

	// Can't have the bot reply to itself
	if (msg.author.bot) return;
	
	// Check if the message starts with the trigger '!'
	if (msg.content.indexOf('?') === 0) {
		// Get the users message and store it in a variable
		var text = msg.content.substring(1);
		
		// Reverse the message
		var reversed = '';
		var i = text.length;
		
		while(i > 0) {
			reversed += text.substring(i - 1, i);
			i--;
		}
		
		// Reply to the user's message
		msg.delete()
 			.then(msg => console.log(`Deleted message from ${msg.author}`))
 			.catch(console.error);
		msg.reply(reversed);
	}
	
	// Random strings that trigger the bot to reply
	if (msg.content.startsWith("bye")) {
		msg.channel.send("Goodbye :wave:, come back if you dare to. :smiling_imp:");
	}
	
	if (msg.content.startsWith("you're stupid")) {
		msg.channel.send("I am smarter than you will ever be :stuck_out_tongue:");
	}
	
	if (msg.content === 'what is my avatar') {
		msg.channel.send(msg.author.avatarURL);
	}
	
	if (msg.content.startsWith("Tell me a joke")) {
		msg.delete()
 			.then(msg => console.log(`Deleted message from ${msg.author}`))
 			.catch(console.error);
		msg.channel.send(resArray[Math.floor(Math.random() * resArray.length)]);
	}
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
	// Send the message to the guilds default channel (#general), metioning the member
	member.guild.defaultChannel.send(`Welcome to the server, ${member}!`);
});

client.login(clientSettings.token);
