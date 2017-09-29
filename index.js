const commando = require('discord.js-commando');
const client = new commando.Client({
	owner: '276233346286092291'
});
const clientSettings = require('./clientsettings.json');
const jokes = require('./jokes.json');
const cheerio = require('cheerio'),
    snekfetch = require('snekfetch'),
    querystring = require('querystring');

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
	/* async function googleCommand(msg, args) {
		let searchMessage = await msg.reply('Searching... Sec.');
	        let searchUrl = `www.google.com/search?q=${encodeURIComponent(msg.content)}`;
		 // We will now use snekfetch to crawl Google.com. Snekfetch uses promises so we will
  		 // utilize that for our try/catch block.
  		 return snekfetch.get(searchUrl).then((result) => {

      			// Cheerio lets us parse the HTML on our google result to grab the URL.
      			let $ = cheerio.load(result.text);

      			// This is allowing us to grab the URL from within the instance of the page (HTML)
      			let googleData = $('.r').first().find('a').first().attr('href');
 
      			// Now that we have our data from Google, we can send it to the channel.
      			googleData = querystring.parse(googleData.replace('/url?', ''));
      			searchMessage.edit(`Result found!\n${googleData.q}`);

  			// If no results are found, we catch it and return 'No results are found!'
 		 }).catch((err) => {
    			 searchMessage.edit('No results found!');
 		 });
	} */

	if (msg.author.bot) return;

	const swearWords = ['darn', 'shucks', 'frak', 'shite', 'Darn', 'Shucks', 'Frak', 'Shite'];
	
	if ( swearWords.some(word => msg.content.includes(word) ) ) {
		msg.reply("Oh no you said a bad word!!!");
	}
	
	// A random response generator acting like an 8ball
	const responses = ['yes', 'no', 'maybe', 'okay', 'sure', 'ask me later', 'naw'];
	
	if ( msg.content.startsWith('==8ball')) {
		msg.channel.send(`${responses[Math.floor(Math.random()
		* responses.length)]}`);
		
		console.log("An 8ball response has been sent in discord!");
	}
});

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
