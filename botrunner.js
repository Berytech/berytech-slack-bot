const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');
const schedule = require('node-schedule');
dotenv.config();
const bot = new SlackBot({token: `${
        process.env.BOT_TOKEN
    }`, name: 'Berytech Bot'})
bot.on('start', () => {


    const params = {
        icon_emoji: ':robot_face:'
    }
    //private channel bot IF you want to send to a different channel change this
    bot.postMessageToGroup('bot', 'Get inspired while working with @BeryBot', params);
})

bot.on('error', (err) => {
    console.log(err);
})

bot.on('group_open', (data) => {
    if (data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
});

// message handler
bot.on('message', (data) => {
    if (data.type !== 'message') {
        return;
    }
    handleMessage(data);
});

function handleMessage(data) {
    let message = data.text;
    if (message != undefined && message.includes('test')) {
        chuckJoke(data);
    }
}

// tell a chuck norris joke
function chuckJoke(data) {
    axios.get('http://api.icndb.com/jokes/random/').then(res => {
        const joke = res.data.value.joke;
        const params = {
            icon_emoji: ':laughing:'
        };

        bot.postMessage(data.channel, `Chuck Norris: ${joke}`, params);
    }).catch(err => {
        console.log(err);

    })
}
