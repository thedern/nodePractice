// requires

// lightweight request lib like axios
const request = require('request');

const cheerio = require('cheerio');

request('https://theonion.com', (err, response, html) => {
    if(!err && response.statusCode === 200) {
        // parse html with cheerio
        const $ = cheerio.load(html);

        const siteHeading = $('.excerpt');
        // get whole object
        //console.log(siteHeading);

        // get html
        //console.log(siteHeading.html());

        // get text
        // console.log(siteHeading.text());

        // find
        // const output = siteHeading.find('p').text();
        // console.log(output);

        // next object child
        // const output = siteHeading.find('p').next();
        // console.log(output);

        // parent
        const output = siteHeading.children('p').parent().text();
        console.log(output);

        /// NOT DONE, NEED TO FINISH VIDEO
    }
});