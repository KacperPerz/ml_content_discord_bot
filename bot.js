require('dotenv').config()

const Discord = require('discord.js');
const request = require('request');
const client = new Discord.Client();
const got = require('got');
const cheerio = require('cheerio');
client.login(process.env.BOTTOKEN);

client.on('ready', readyDiscord);

function readyDiscord() {
    console.log('ops');
}

replies = [
    'aye!',
    'whazza',
    'relax'
]

// Kindacode.com
const URL = 'https://paperswithcode.com/';
pwc = new Set();
request(URL, (error, response, html) => {
    const $ = cheerio.load(html);

    const divs = $('.item-content');
    const out = divs.find('h1').find('a').attr('href');
    const ac = $('a');
    links = []
    re = new RegExp('.paper/.*');
    ac.each((index, element) => {
        if(re.test($(element).attr('href')))
        links.push(
            $(element).attr('href')
        );
    });
    pwc = [... new Set(links)]
    console.log(pwc);
});

client.on('message', gotMessage);

function gotMessage(msg) {
    console.log(msg.content);
    if(msg.channel.id == '847181337910968370' && msg.content == 'pwc') {


        msg.channel.send("Have you seen new paper?\n");
        msg.channel.send('https://www.paperswithcode.com' + pwc[0]);
        
        
        //console.log(links);
    }
}
