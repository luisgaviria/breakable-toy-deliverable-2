import Twit from "twit";
// const notifier = require("node-notifier");
// const open = require("open");
// const franc = require("franc");

const apiKey = "YP7hKQ4AsYTQbHfaOcOlfTjPm";

const apiKeySecret = "Fk2tc0KdYDaHsuJY9kZBQHLCZmQ3nEDxl0JYLH7pY5rYB2Avvvs";

const bearerToken =
  "AAAAAAAAAAAAAAAAAAAAAHedMAEAAAAATIHSCWaTImXK1mqPXEszYmcWOBU%3D0mg5NV6NDBkKw6SnpKIXI0v1lp9Lr7KBmRUFqlRBbBFMUGANla";

const accessToken = "1354250606375010304-f3At5f62ATdcVoAmIEVkgRROo6VbCh";

const accessTokenSecret = "v8pkZsj5BlE9A20fq7Sl9fcHKTfEAtVsJwYPIzCrBnlXZ";

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
