const { client } = require("./client");

async function init() {
  const a = await client.msetnx(["test:1", "test1", "test:2", "test2"]);
  console.log(a);
  const result = await client.mget(["test:1", "test:2"]);
  console.log(result);
  client.disconnect();
}

init();
