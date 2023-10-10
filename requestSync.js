const request = require("sync-request");
const url =
  "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";

let totalTime = 0; // 累計的時間

function requestSync(url) {
  const startTime = Date.now();
  const response = request("GET", url);
  const endTime = Date.now();
  const executionTime = endTime - startTime;
  totalTime += executionTime; // 累加時間
  console.log(`Execution time: ${executionTime}ms`);
}

requestSync(url);
requestSync(url);
requestSync(url);

console.log(`Total execution time: ${totalTime}ms`); // 印出加總的時間
