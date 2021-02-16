import Twit from "twit";
// const notifier = require("node-notifier");
// const open = require("open");
// const franc = require("franc");

let T = new Twit({
  consumer_key: apiKey,
  consumer_secret: apiKeySecret,
  access_token: accessToken,
  access_token_secret: accessTokenSecret,
});

async () => {
  T.get(
    "search/tweets",
    { q: "#tesla since: 2021-2-1", count: 20 },
    function (err, data, response) {
      debugger;
      // const tweets = data.statuses;
      console.log(data);
    }
  );
};

export default T;
