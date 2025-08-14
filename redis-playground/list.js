const { client } = require("./client");

async function init() {
  //   await client.lpush("list", 3);
  //   await client.lpush("list", 4);
  //   await client.lpush("list", 5);
  //   await client.lpush("list", 6);
  //   await client.rpush("list", 2);
  //  // const result = await client.lpop("list");
  const result = await client.rpop("list");
  console.log(result);
  client.disconnect();
}
init();
