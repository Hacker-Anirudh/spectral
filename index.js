require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
});

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
/spectral-spacefact - Get a space fact`
    });
});


(async () => {
    await app.start();
    console.log("bot is running!");
})();