import dotenv from 'dotenv';
dotenv.config();

import OBSWebSocket from "obs-websocket-js";

var foo = 0;
const obs = new OBSWebSocket();
// connect to obs-websocket running on localhost with same port
// in .env folder, add:
//      LOCALHOST_PORT='localhost:<insert port number here>'
//      LOCALHOST_PW='<insert password here>'
obs.connect({ address: process.env.LOCALHOST_PORT, password: process.env.LOCALHOST_PW });


function SetEmote(id, sourceName, closed, open) {

    let myPromise = obs.send("SetSourceSettings",
        {
            "sourceName": sourceName,
            "sourceSettings": {
                "url": "https://streamkit.discord.com/overlay/voice/1009477589439631470/1009477589439631474?icon=true&online=true&logo=white&text_color=%23ffffff&text_size=14&text_outline_color=%23000000&text_outline_size=0&text_shadow_color=%23000000&text_shadow_size=0&bg_color=%231e2124&bg_opacity=0.95&bg_shadow_color=%23000000&bg_shadow_size=0&invite_code=rHK7gntDSb&limit_speaking=false&small_avatars=false&hide_names=true&fade_chat=0", //"?" + foo,
                "css": "li.voice-state:not([data-reactid*=\"" + id + "\"]) {display: none;}.avatar {content: url(" + closed + ");height: auto !important;width: auto !important;margin: -16px;border-radius: 0% !important;filter: brightness(100%);}.speaking {border-color: rgba(0, 0, 0, 0) !important;position: relative;animation-name: none;animation-duration: 1s;animation-fill-mode: forwards;filter: brightness(100%);content: url(" + open + ");}li.voice-state {position: static;}div.user {position: absolute;left: 40%;bottom: 5%;}body {background-color: rgba(0, 0, 0, 0);margin: 0px auto;overflow: hidden;}"
            }
        });

    myPromise.then(
        function (value) { console.log(sourceName, " ", id, " \n", closed, " \n", open, " \n", value.sourceSettings.url); },
        function (error) { console.log("something happened ", error.error); }
    );

    //});
}

export function Test() { console.log("I've done it"); }

export function ChangeEmote(discordName, ind) {
    var i = 0;
    const len = IdEmoteList.length;
    while (i < len) {
        const hold = IdEmoteList[i];

        if (hold[1] === discordName) {
            //list of emotes
            const emotes = hold[3];
            //prevents out of bounds
            if (emotes.length <= ind) { return -2; }

            //emote we want
            const expression = emotes[ind];


            const id = hold[0];
            const browserName = hold[2];
            const closed = expression[1];
            const open = expression[2];

            SetEmote(id, browserName, closed, open);

            return 0;
        }

        i = i + 1;
    }

    return -1;
}

//call to get a list of emote names
function GetEmoteList(discordName) {
    var i = 0;
    const len = IdEmoteList.length;
    var ret = [];
    while (i < len) {
        const hold = IdEmoteList[i];
        //console.log("looking for : " + discordName + " | at " + i + ", looking at : " + hold[1]);

        //we found the correct user
        if (hold[1] === discordName) {
            //list of emotes
            const emotes = hold[3];
            // index for inner loop
            var j = 0;
            //length of list of emotes
            const len = emotes.length;
            console.log("Name " + discordName + " found");

            while (j < len) {
                const foo = emotes[j];
                //append the name of the current emote
                ret.push(foo[0]);

                //console.log(foo[0]);

                j++;
            }

            //force end the loop 
            break;
        }

        i = i + 1;
    }

    return ret;
}

//call to get a list of emote names as one string
export function GetEmotes(discordName) {
    var i = 1;
    const emoteList = GetEmoteList(discordName);
    const len = emoteList.length;

    //bit of protection, just in case we didn't find a list of emots for the user
    if (len == 0) { return "Error: emote set for " + discordName + " not found"; }

    var ret = discordName + " :: 0 - " + emoteList[0];

    while (i < len) {
        const hold = emoteList[i];

        ret += ", " + i + " - " + hold

        i = i + 1;
    }

    return ret;
}

//call to get a specific emote name
export function GetEmoteName(discordName, ind) {
    const list = GetEmoteList(discordName);

    if (list.length == 0) { return "Error: emote set for " + discordName + " not found"; }
    if (list.length <= ind) { return "Error: emote at " + ind + " not found"; }

    return list[ind];
}

// list of relevent discord/obs information
const IdEmoteList = [
    [
        //discord ID
        "Insert Discord ID here",
        //discord server username
        "Server name of Discord user",
        //browser source name
        "Name of the browser source in OBS",
        //each element of two strings is an emote 
        //["name of emote (optional)", "closed mouth emote url", "open mouth emote url"]
        [
            ["Happy", "Discord image link to silent expression", "Discord image link to talking expression"],
            ["Sad", "Discord image link to silent expression", "Discord image link to talking expression"]
        ]
    ],
    [
        //discord ID
        "Server name of Discord user",
        //discord server username
        "Server name of Discord user",
        //browser source name
        "Name of the browser source in OBS",
        //each element of two strings is an emote 
        //["name of emote, you can decide what it's called (optional)", "closed mouth emote url", "open mouth emote url"]
        [
            ["Neutral", "Discord image link to silent expression", "Discord image link to talking expression"],
            ["Excited", "Discord image link to silent expression", "Discord image link to talking expression"]
        ]
    ]
]
