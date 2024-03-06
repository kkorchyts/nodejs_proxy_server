const axios = require('axios');
const https = require('https')
const {readFileSync} = require("fs");

const agent = new https.Agent({
    cert: readFileSync('api.nasa.gov.crt'),
})


axios.get('https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY', {httpsAgent: agent})
    .then(res => {
        console.log('Status Code:', res.status);
        /*const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
        console.log('Status Code:', res.status);
        console.log('Date in Response header:', headerDate);

        const users = res.data;

        for(user of users) {
            console.log(`Got user with id: ${user.id}, name: ${user.name}`);
        }*/
    })
    .catch(err => {
        console.log('Error: ', err.message);
    });