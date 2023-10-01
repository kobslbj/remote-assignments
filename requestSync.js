const request = require('sync-request');
const url = "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";

function requestSync(url) {
    const startTime = Date.now();
    const response = request('GET', url);
    const endTime = Date.now();
    console.log(`Execution time: ${endTime - startTime}ms`);
}

requestSync(url);
requestSync(url);
requestSync(url);
