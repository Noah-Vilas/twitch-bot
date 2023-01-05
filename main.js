
const tmi = require('tmi.js');
const { Client, Intents, Invite } = require('discord.js')
const discordclient = new Client({intents: ['GuildInvites','Guilds'] })
// Define configuration options
const opts = require("./twitch_info.json");
let games = []
// Create a new Twitch client with our options
const client = new tmi.client(opts);

const clientID = '859614401681555476';
discordclient.login(require("./discord_info.json").info);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();
function get_discord_link(){
  const dserver = discordclient.guilds.cache.get('859614401681555476');
   return dserver.channels.cache.get('867657623403102219').createInvite();
}



//defing a command set for the stream
var commands = {};
commands[`!tiktok`] = `Here's the link to the tiktok https://www.tiktok.com/@noah.virus?lang=en`;
commands[`!Tiktok`] = `Here's the link to the tiktok https://www.tiktok.com/@noah.virus?lang=en`;
commands[`tiktok`] = `Here's the link to the tiktok https://www.tiktok.com/@noah.virus?lang=en`;
commands[`Tiktok`] = `Here's the link to the tiktok https://www.tiktok.com/@noah.virus?lang=en`;
commands[`!youtube`] = `Here's the link to the youtube https://www.youtube.com/channel/UCN8kqG0023f6HG7nxfmpW9w`;
commands[`!Youtube`] = `Here's the link to the youtube https://www.youtube.com/channel/UCN8kqG0023f6HG7nxfmpW9w`;
commands[`youtube`] = `Here's the link to the youtube https://www.youtube.com/channel/UCN8kqG0023f6HG7nxfmpW9w`;
commands[`Youtube`] = `Here's the link to the youtube https://www.youtube.com/channel/UCN8kqG0023f6HG7nxfmpW9w`;
commands[`lurk`] = `glad to have you in chat, enjoy`;
commands[`Lurk`] = `glad to have you in chat, enjoy`;
commands[`!lurk`] = `glad to have you in chat, enjoy`;
commands[`!Lurk`] = `glad to have you in chat, enjoy`;
commands[`!Instagram`] = `Here's the link to the Instagram https://www.instagram.com/noah.virus/`;
commands[`!instagram`] = `Here's the link to the Instagram https://www.instagram.com/noah.virus/`;
commands[`Instagram`] = `Here's the link to the Instagram https://www.instagram.com/noah.virus/`;
commands[`instagram`] = `Here's the link to the Instagram https://www.instagram.com/noah.virus/`;
commands[`!Epal`] = `Heres my epal https://www.epal.gg/epal/1181269`;
commands[`!epal`] = `Heres my epal https://www.epal.gg/epal/1181269`;
commands[`Epal`] = `Heres my epal https://www.epal.gg/epal/1181269`;
commands[`epal`] = `Heres my epal https://www.epal.gg/epal/1181269`;

//handle a message
function onMessageHandler (target, context, msg, self) {
  console.clear();
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  //rolls a dice
  if (commandName.substring(0,5) === '!dice') {
    const num = rollDice(commandName.substring(5,commandName.length));
    client.say(target, `You rolled a ${num+1}`);
    console.log(`* Executed ${commandName} command`);
  // send the tiktok link
  }else if(commandName in commands){
    client.say(target, commands[commandName]);

  //creates a discord link
  }else if(commandName === "!discord"||commandName === "Discord"||commandName === "!Discord"||commandName === "discord"){
    link = get_discord_link().then(Invite =>{
      client.say(target, `Here's the link to the Discord ${Invite.url}`);
    }).catch(console.error);
    //list options
  }else if (commandName === "Options"||commandName === "!Options"||commandName === "options"||commandName === "!options"){
    client.say(target,`1. tiktok, 2. discord, 3. youtube, 4. lurk, 5. instagram, 6. epal`);
  }
   else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice (side) {
    console.log(side);
  const sides = side;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}