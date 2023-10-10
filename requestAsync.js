const axios = require("axios");

const url =
  "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";

let totalTime = 0;

function addToTotalTime(duration) {
  totalTime += duration;
}

function requestCallback(url) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    axios
      .get(url)
      .then((response) => {
        const duration = Date.now() - start;
        addToTotalTime(duration);
        resolve(`Execution time for callback request: ${duration}ms`);
      })
      .catch((error) => {
        console.error(`Error during callback request: ${error.message}`);
        reject(error);
      });
  });
}

function requestPromise(url) {
  const start = Date.now();
  return axios.get(url).then((response) => {
    const duration = Date.now() - start;
    addToTotalTime(duration);
    return `Execution time for promise request: ${duration}ms`;
  });
}

async function requestAsyncAwait(url) {
  try {
    return await requestPromise(url);
  } catch (error) {
    console.error(`Error during async/await request: ${error.message}`);
  }
}

// Start timer
const programStart = Date.now();

Promise.all([requestCallback(url), requestPromise(url), requestAsyncAwait(url)])
  .then((results) => {
    results.forEach((result) => console.log(result));

    const programEnd = Date.now();
    console.log(
      `Total execution time for the program: ${programEnd - programStart}ms`,
    );
  })
  .catch((error) => {
    console.error("An error occurred during one of the requests.", error);
  });
