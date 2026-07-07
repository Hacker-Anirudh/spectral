require("dotenv").config();

const { App } = require("@slack/bolt");
const axios = require("axios");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
});

const space_objects = [
    "earth",
    "moon",
    "mars",
    "jupiter",
    "saturn",
    "mercury",
    "venus",
    "uranus",
    "sun"
];

app.command("/spectral-about", async ({ command, ack, respond }) => {
    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    await respond({ text: `Latency: ${latency}ms\n(c) Anirudh Menon 2026. All rights reserved.\n GNU GPLv3 license.` });
});

app.command("/spectral-help", async ({ ack, respond }) => {
    await ack();
    await respond({
        text:
            `Available Commands:
/spectral-help - About Spectral!
/spectral-spacefacts - Get a space fact!`
    });
});

app.command("spectral-spacefacts", async ({ acke, respond }) => {
    await ack();
    const object = space_objects[Math.floor(Math.random * space_objects.length)]

    try {
        const { data } = await axios.get(`https://api.bootprint.space/fact/${object}`);
        await respond({
            text: `*${object.charAt(0).toUpperCase() + object.slice(1)}*\n${data.fact}`
        })
    } catch (e) {
        await respond({
            text: 'Failed to retrieve data, try again later.'
        })
    };

});


(async () => {
    await app.start();
    console.log("bot is running!");
})();