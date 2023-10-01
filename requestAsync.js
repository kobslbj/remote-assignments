const axios = require('axios');

const url = "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";

function requestCallback(url, callback) {
    const start = Date.now();
    axios.get(url)
        .then(response => {
            const duration = Date.now() - start;
            callback(`Execution time for callback request: ${duration}ms`);
        })
        .catch(error => {
            console.error(`Error during callback request: ${error.message}`);
        });
}

function requestPromise(url) {
    const start = Date.now();
    return axios.get(url)
        .then(response => {
            const duration = Date.now() - start;
            return `Execution time for promise request: ${duration}ms`;
        });
}

async function requestAsyncAwait(url) {
    try {
        const result = await requestPromise(url);
        console.log(result);
    } catch (error) {
        console.error(`Error during async/await request: ${error.message}`);
    }
}

requestCallback(url, console.log);
requestPromise(url).then(console.log);
requestAsyncAwait(url);
