/*
Copyright 2026 Anirudh Menon

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

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
/spectral-help - Help using Spectral!
/spectral-about - About Spectral!
/spectral-spacefacts - Get a space fact!
/spectral-uselessfacts - Get an entirely useless fact
/spectral-duckpic - Get a random picture of a duck for free!`
    });
});

app.command("/spectral-spacefacts", async ({ ack, respond }) => {
    await ack();
    const object = space_objects[Math.floor(Math.random() * space_objects.length)]

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

app.command("/spectral-uselessfacts", async ({ ack, respond }) => {
    await ack();

    try {
        const { data } = await axios.get(`https://uselessfacts.jsph.pl/api/v2/facts/random?language=en`);
        await respond({
            text: data.text
        })
    } catch (e) {
        await respond({
            text: 'Failed to retrieve fact, try again later.'
        })
    };

});

app.command("/spectral-duckpic", async ({ ack, respond }) => {
    await ack();
    try {
        const { data } = await axios.get(`https://random-d.uk/api/random`);
        await respond({
            blocks: [
                {
                    type: "image",
                    image_url: data.url,
                    alt_text: "The duck picture!",
                }
            ],
            text: data.message
        })
    } catch (e) {
        await respond({
            text: 'Failed to retrieve duck pic, try again later.'
        })
    };

});


(async () => {
    await app.start();
    console.log("bot is running!");
})();