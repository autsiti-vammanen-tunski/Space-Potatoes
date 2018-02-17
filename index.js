const Discord = require("discord.js");
const client = new Discord.Client();

var reply_server;
var reply_channel;
var fs = require("fs");
var data = fs.readFileSync("botsettings.json");
var botsettings = JSON.parse(data)
var botkey = botsettings.botkey;
var guildNames = client.guilds.map(g => g.id.toString());
var colors = botsettings.colors;
var color_number = 0;

client.login(botkey);

client.on("ready", () => {
  var guildNames = client.guilds.map(u => u.toString());
  for (let value of guildNames) {
    console.log(value);
  }
  client.user.setGame("help for help")
  raimbow_function();
});

client.on("message", msg => {
  if (msg.content === ("random")) {
    if (msg.channel.type === "dm"){
      msg.author.sendMessage("error")
    }
    else{
    reply_server = msg.guild.id
    reply_channel = msg.channel.id
    random = client.guilds.get(reply_server).members.random();
    client.channels.get(reply_channel).send(""+random);
    }
  }
});



client.on("message", msg => {
  if (msg.content === ("help")) {
    msg.author.sendMessage("```\nhelp   \tfor help\nrandom \ttomention random user\nraimbow\trole with name raimbow will swap color```");
    msg.delete()
  }
});


function raimbow_function(){
  color_atm =("#"+colors["color"+color_number]);
  color_number = color_number + 1;
  var guildNames = client.guilds.map(g => g.id.toString());
  for (let value of guildNames) {
    if (color_number === 33){
      color_number = 0;
    }
    console.log(color_number);
    console.log(color_atm);
    client.guilds.get(value).roles.find("name", "raimbow").setColor(color_atm);
  }
  setTimeout(raimbow_function,Math.random() + 5000);
}



/*
console.log(botsettings);
botsettings.prefix = "new prefix";
console.log(botsettings);
botsettings = JSON.stringify(botsettings, null , 2);
fs.writeFile("botsettings.json", botsettings);
*/