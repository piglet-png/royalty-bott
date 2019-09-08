const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NjE4MDkyNzAyMzY1NjQ2ODY4.XW0uMQ.HQ9Qpme2MctjWzlS-jbsy0DwS50';


//cooldown constant defined
const usedCommandRecently = new Set();

const PREFIX = "!";
bot.on("message", (message) => {
  // our new check:
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;
  // [rest of the code]
});

//how to create an event to welcome new members who join specific to a channel, in this case it is called "test"
bot.on("guildMemberAdd", member => {

  const channel = member.guild.channels.find(channel => channel.name === "general")
  if (!channel) return;

  channel.send(`Welcome to the server, ${member}, please read the rules and the welcome messages!`)
});


//confirms bot launches thru console
bot.on('ready', () => {
  console.log('Ready to launch');

  bot.user.setActivity("Over the server", { type: 'WATCHING' })

});

//defining the prefix
bot.on('message', message => {
  if (message.author.bot) return;
  let args = message.content.substring(PREFIX.length).split(" ");



  //switch preforms conditional statements. in this instance checking argument 0 (in code) or the matching the first word
  switch (args[0]) {
    case 'ping':
      if (usedCommandRecently.has(message.author.id)) {
        message.channel.sendMessage('pong')
      }
      else {
        message.reply("You cannot use that command again just yet, please wait another 30 seconds.");

        usedCommandRecently.add(message.author.id);
        setTimeout(() => {
          usedCommandRecently.delete(message.author.id)
        }, 30000);
        break;
      }
      break;

    case 'twitch': {
      message.channel.sendMessage('www.twitch.tv/SilencerKillz')
    };
      break;

    case 'info': {
      bot.guilds.get("388426434366013453").channels.get(`619434953930964992`).send(`yur`);
    };
      break;


    case 'clear':

      // how to pass a command through a roll filter
      if (message.member.roles.find(r => r.name === "Mods")) { }
      else {
        return message.channel.send('Error, you have insufficient permissions')
      }
      if (!args[1]) return message.reply('Error, please input a number after you type ! clear')
      message.channel.bulkDelete(args[1]);
      break;

    case 'help':
      if (usedCommandRecently.has(message.author.id)) {
        message.reply("You cannot use that command again just yet, please wait another 30 seconds.");
      } else {
        message.author.send("'The available commands are: \n\!help \n\ \n\ !twitch: tells you in chat what Silencers twitch is \n\ \n\ !info: TBD \n\ \n\ !question answers your question with 3 preset responses \n\ \n\ !coin does a random coin flip, outputs the result in chat \n\ \n\ !ping: replies with `pong` in chat.  \n\ \n\ MODS ONLY  \n\ \n\ !clear \n\ \n\ !kick \n\ \n\ !ban");

        usedCommandRecently.add(message.author.id);
        setTimeout(() => {
          usedCommandRecently.delete(message.author.id)
        }, 30000);

      }
      break;

    case 'question': {

      if (!args[1]) return message.reply("please ask a full question");
      let replies = ["hell yes", "hell no", "maybe later"];

      let result = Math.floor((Math.random() * replies.length))
      let question = args.slice(1).join(" ");

      let kickEmbed = new Discord.RichEmbed()

        .addField("Question", question)
        .addField("Answer", replies[result])
      message.channel.send(ballembed);
    }
      break;

    case "coin": {

      if (args[0]) ;
      let replies = [`heads`, `tails`];

      let result = Math.floor((Math.random() * replies.length));

      let ballembed = new Discord.RichEmbed()

        .addField("Results", replies[result])
      message.channel.send(ballembed);
      break;

    }
  }

  //kick command
  switch (args[0]) {
    case 'kick':

      if (message.member.roles.find(r => r.name === "Mods")) { }
      else {
        return message.channel.send('Error, you have insufficient permissions')
      }

      if (!args[1]) message.channel.send("You need to specify a user!")
      var kUser = message.mentions.users.first();

      if (kUser) {
        var kUser = message.guild.member(kUser);
        var kReason = args.slice(1).join(` `);

        if (kUser) {
          kUser.kick('You were kicked.').then(() => {
            bot.guilds.get("388426434366013453").channels.get(`619434953930964992`).send(kickEmbed);
          }).catch(err => {
            message.reply('Unable to kick the specified member.');
            console.log(err);
          });
        }
      }

      let kickEmbed = new Discord.RichEmbed()

      .addField("Banned Member" , `${kUser}`)
      .addField("Banned by", `${message.member.displayName}`)
      .addField("Banned at", message.createdAt)
      .addField("Banned reason", kReason);
  };
  //end kick command

  //ban command
  switch (args[0]) {
    case 'ban':

      if (message.member.roles.find(r => r.name === "Mods")) { }
      else {
        return message.channel.send('Error, you have insufficient permissions')
      }

      if (!args[1]) message.channel.send("You need to specify a user!")
      var bUser = message.mentions.users.first();

      if (bUser) {
        var bUser = message.guild.member(bUser)
        var reason = args.slice(1).join(` `);

        if (bUser) {
          bUser.ban(reason).then(() => {
            bot.guilds.get("388426434366013453").channels.get(`619434953930964992`).send(banEmbed);
          }).catch(err => {
            message.reply('Unable to ban the specified member.');
            console.log(err);
          });
        }
      }
      let banEmbed = new Discord.RichEmbed()

      .addField("Banned Member" , `${bUser}`)
      .addField("Banned by", `${message.member.displayName}`)
      .addField("Banned at", message.createdAt)
      .addField("Banned reason", reason);
//figure out how to get rid of the @user in the reason

  };
  //end ban command



});





bot.login(token);

function newFunction(args) {
  return args.split(' ');
}
