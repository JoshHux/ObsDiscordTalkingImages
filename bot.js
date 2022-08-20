import dotenv from 'dotenv';
dotenv.config()

import Discord from 'discord.js';
import { ChangeEmote, GetEmoteName, GetEmotes } from "./BrowserChanger.js";
import { Client, GatewayIntentBits, Partials } from "discord.js";

//const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel],
});

//fire when bot is ready
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

//fire when the bot detects a message created
client.on("messageCreate", msg => {
    if (msg.author.bot) return false;

    //want to change emote
    const pivot = msg.content.indexOf("!e");
    //want to see all of their emote names
    const pivot2 = msg.content.indexOf("?eall");
    //want to see name of a specific emote
    const pivot3 = msg.content.indexOf("?e");

    if (pivot > -1) {
        console.log(`\nMessage from ${msg.member.displayName}: ${msg.content}`);
        const toParse = msg.content.substring(pivot + 2);

        try {
            const emote = parseInt(toParse);
            const foo = ChangeEmote(msg.member.displayName, emote)
            if (foo == -1) {
                const replyContent = "Couldn't find your name, " + GetChiffonInsult();
                msg.reply(replyContent);
            } else if (foo == -2) {
                const replyContent = "That emote doesn't exist, " + GetChiffonInsult();
                msg.reply(replyContent);
            }
        } catch {
            const replyContent = "Invalid command, " + GetChiffonInsult();
            msg.reply(replyContent);
        }
    }

    if (pivot2 > -1) {
        console.log(`\nMessage from ${msg.member.displayName}: ${msg.content}`);
        const replyContent = GetEmotes(msg.member.displayName) + ", " + GetChiffonInsult();
        msg.reply(replyContent);

    }
    else if (pivot3 > -1) {

        const toParse = msg.content.substring(pivot3 + 2);
        console.log(`\nMessage from ${msg.member.displayName}: ${msg.content}`);

        try {
            const emote = parseInt(toParse);
            const replyContent = GetEmoteName(msg.member.displayName, emote);
            if (replyContent != null) {
                if (replyContent.indexOf("Error") > -1) {
                    msg.reply(replyContent + ", " + GetChiffonInsult());
                } else {
                    msg.reply(replyContent);
                }
            } else {
                const replyContent = "Invalid command, " + GetChiffonInsult();
                msg.reply(replyContent);
            }
        } catch {
            const replyContent = "Invalid command, " + GetChiffonInsult();
            msg.reply(replyContent);
        }

    }
})

//set the discord token to your bot's
client.login(process.env.DISCORD_TOKEN);


/*---- FLAVOR STUFF ----*/
//This bot was originally made for FabledAtlas (https://www.twitch.tv/fabledatlas) to use in their DnD streams, StoryMode (https://www.twitch.tv/storymodetv).
//  It's based on their little cheeky stream helper named Chiffon.
//  As such, this bot was given the ability to add a tiny insult at the end of an invalid command error message.
//  feel free to replace or add more as you like, god knows Chiffon would love it.

//list of instuts Chiffon can give you
const insults = ["dummy", "dum dum", "mortal", "poopy head"]

function GetChiffonInsult() {
    //get random index in array
    //from: https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
    var item = insults[Math.floor(Math.random() * insults.length)];

    return item;
}