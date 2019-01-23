const Discord = require('discord.js');
const bot = new Discord.Client();


bot.on("ready", () =>{
  console.log("Meow!");
  bot.user.setGame('ronronner | prefix!help')
});

const prefix = "prefix!";
const prefixMention = "<@botId> ";
const hex = /^#[0-9a-fA-F]{6}$/;
const colorHex = /^color #[0-9A-F]{6}$/;
const age = /^\d\d$/;
const ageRole = /^\d\d ans$/;
const sep = /^-/;

bot.on("message", message => {
  if(message.author.bot) return;
  if(!(message.content.startsWith(prefix)||message.content.startsWith(prefixMention))) return;
  var command;
  var args;
  if (message.content.startsWith(prefix)) {
    command = message.content.split(" ")[0].slice(prefix.length);
    args = message.content.split(" ").slice(1);
  } else {
    command = message.content.split(" ")[1];
    args = message.content.split(" ").slice(2);
  }
  if (command === "help" && args.length === 0){
    let helpmessage = "\
```Markdown\n\
neko![commande] ou @Nekobot [commande]\n\n\
|            Commande           |                                   Effet                                   |\n\
|:-----------------------------:|:-------------------------------------------------------------------------:|\n\
| help                          | Affiche l'aide                                                            |\n\
| **gratouilles**               | **Rrrrrr Rrrrr Rrrrrrr Rrrrr**                                            |\n\
| color #[000000-FFFFFF | none] | Je me charge de la paperasse et tu peux changer de couleur instantanément,|\n\
|                               | ça mérite bien des gratouilles non?                                       |\n\
| send nude                     | Je t'envoie une photo osée de moi                                         |\n\
| NSFW                          | Tu veux aller sur le channel NSFW ?                                       |\n\
| wink                          | Je cligne de l'oeil                                                       |\n\
| Iam [homme|femme|10-99]       | Je m'occupe de t'assigner ces rôles, tu peux bien me gratouiller          |\n\
```\
";
return message.author.send(helpmessage);
  }
  if (command === "**gratouilles**" && args.length === 0){
    if (message.guild !== null){
        if (message.member.voiceChannel !== undefined){
          let vChannel = message.member.voiceChannel;
          vChannel.join().then(connection => {
          const dispatcher = connection.playFile("./Purr.mp3");
          dispatcher.on("end", () =>{
            vChannel.leave();
          })
        });
      }
    }
    return message.channel.send("**Rrrrrrrrrrrrrrrrrrr Rrrrrrrrrrrrrrrrrrrrrrr Rrrrrrrrrrrrrrrrrrrrrrrr Rrrrrrrrrrrrrrrrrrrrr**");
  }
  if (command === "color" && message.guild !== null){
    if ((hex.test(args[0])||args[0]==="none") && args.length === 1 ) {
      var myroles = message.member.roles.filter(r => colorHex.test(r.name));
      myroles.forEach(r => message.member.removeRole(r));
      if (args[0] !== "none"){
        if(!message.guild.roles.exists("name","color " + args[0])){
          message.guild.createRole({
            name: "color "+args[0].toUpperCase(),
            color: args[0],
          }).then(role=>{message.member.addRole(role)});
        }else{
          message.member.addRole(message.guild.roles.find("name","color "+args[0].toUpperCase()));
        }
      }
      myroles.forEach(r => {if(r.members === null) r.delete();});
    } else {
      message.channel.send("Syntax error: color #[000000-FFFFFF | none]");
    }
    return;
  }

  if (command === "send" && args[0] === "nudes" && args.length === 1){
    return message.channel.send("",{files : ['./sendNude.jpg']});
  }

  if (command === "wink" && args.length === 0){
    return message.channel.send("",{files : ['./wink.jpeg']});
  }

  if (command === "NSFW" && args.length === 0 && message.guild.id == "guildId"){
    message.member.addRole(message.guild.roles.find("name","NSFW"));
  }

  if (command === "Iam" && args.length === 1 && message.guild.id == "guildId"){
    if (args[0]==="homme") {
      var myroles = message.member.roles.filter(r => r.name === "Femme");
      myroles.forEach(r => message.member.removeRole(r));
      message.member.addRole(message.guild.roles.find("name","Homme"));
    } else if (args[0]==="femme") {
      var myroles = message.member.roles.filter(r => r.name === "Homme");
      myroles.forEach(r => message.member.removeRole(r));
      message.member.addRole(message.guild.roles.find("name","Femme"));
    } else if (age.test(args[0])){
      var myroles = message.member.roles.filter(r => ageRole.test(r.name));
      myroles.forEach(r => message.member.removeRole(r));
      if(!message.guild.roles.exists("name",args[0] + " ans")){
        message.guild.createRole({
          name: args[0] + " ans",
          position: message.guild.roles.find("name","don't delete don't use").position,
        }).then(role=>{message.member.addRole(role)});
      }else{
        message.member.addRole(message.guild.roles.find("name",args[0] + " ans"));
      }
      myroles.forEach(r => {if(r.members === null) r.delete();});
    }
    return;
  }
  
});

bot.on("guildMemberAdd", member => {
  if (member.guild.id == "guildId"){
   member.addRoles(member.guild.roles.filter(r => sep.test(r.name)));
  }
});

bot.login('secret');
