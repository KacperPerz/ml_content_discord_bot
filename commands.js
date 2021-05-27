
const cheerio = require('cheerio');
const request = require('request');

const pwc = require('./commands/pwc.js');
const yt = require('./commands/yt.js');


const URL = 'https://paperswithcode.com/';

set = new Set(); //tided data
request(URL, (error, response, html) => {
    const $ = cheerio.load(html);

    const ac = $('a');
    links = []
    re = new RegExp('.paper/.*');
    ac.each((index, element) => {
        if(re.test($(element).attr('href')))
        links.push(
            $(element).attr('href')
        );
    });
    set = [... new Set(links)]
    console.log(set);
});

const commands = { pwc, yt };

module.exports = function(msg) {
    console.log(msg.content);
    if(msg.channel.id == '847181337910968370') {
        let tokens = msg.content.split(" ");
        let command = tokens.shift();
        if(command.charAt(0) === "!"){
            command = command.substring(1);
            commands[command](msg, tokens);
        }

        //console.log(links);
    }
}