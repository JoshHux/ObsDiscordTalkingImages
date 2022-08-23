# OBS Discord Talking Images

---

This is a bot meant for allowing multiple users to control the expressions of their talking avatar through discord.
Using this bot, you and your friends can change their silent and talking portraits through discord commands.

This bot only works if the people who want their portrait use OBS browser source to do so.

This bot is still pretty rudimentary and doesn't have much going on under the hood, don't expect something super high quality or complex. I'm not that experienced with JavaScript, css, or obs, I just want to put this here so that no one else needs to go through the same trouble.

If you want to fork, copy, or improve this bot, feel free to! This is meant to be shared!

---
## Getting Started

### Installs
You will need:
- [OBS-Websocket-js](https://github.com/obs-websocket-community-projects/obs-websocket-js) specifically version 4.0.3, which is the latest version compatible with... 
- [OBS-Websocket](https://github.com/obsproject/obs-websocket), specifically version 4.9.1. 
- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/) (use a command below to install)

To install Node.js, just go [here](https://nodejs.org/en/download/).

Then, to install NPM run the following command in your terminal.
```
    npm install node
```
If you're having issues getting the command to work, I personally like using [VS Code](https://code.visualstudio.com/Download), opening the project in there, going to Terminal > New Terminal, and right-clicking to paste the command in (terminals are weird, you can't use Ctrl-C and Ctrl-V).

You can find the installer for obs-websocket version 4.9.1 [here](https://github.com/obsproject/obs-websocket/releases/tag/4.9.1).

You can install the correct version of [OBS-Websocket-js](https://github.com/obs-websocket-community-projects/obs-websocket-js) by running this command in your terminal:
```
    npm install obs-websocket-js@4.0.3
```

### Additional Setup
Next make a new file named ".env" and put it in the main "WebsocketJsTest" folder.
- Important note: DO NOT, UNDER ANY CIRCUMSTANCES, SHOW THE CONTENT OF THAT FILE TO ANYONE, THAT FILE WILL CONTAIN VERY PRIVATE INFORMATION THAT SHOULD NOT BE ACCESSED BY ANYONE OTHER THAN YOU.

In .env file, add the lines:
```js
    DISCORD_TOKEN='<insert bot token here>'
    LOCALHOST_PORT='localhost:<insert port number here>'
    LOCALHOST_PW='<insert password here>'
```
This will allow you to hook up the OBS WebSockets server (in OBS, Tools > WebSockets Server Settings). 

### Setting Up the Emotes
In BrowserChanger.js, there's a list of information about each person you want to make a talking avatar for. Simply follow the instructions and paste the right information in the right place (you will need to have Advaced > Developer Mode turned on in Discord to get a person's Discord ID).

### Running the Bot
In your terminal, just run:
```
    node bot.js
```
To get it started!

---
## Things to Note

When someone changes their emote, they will have their portrait disappear for a small bit before reappearing. This is because changing you emote causes the browser source to refresh, making it relaod the image set being displayed. 
Currently, there is no workaround for this and there are no plans to fix this is the future. This is because this issue is ingrained into how the bot changes emotes and how the issue is relatively minor. Fixing this issue would require changing how the talking portraits are displayed and possibly how discord communicates with OBS.

---
## Plans for the Future

- Move IdEmoteList out of BrowserChanger.js and into a json file to allow for more organization.
- Allow Discord user to assign their emotes (name, url, etc.) through bot commands