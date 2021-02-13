import { TwitterClient } from "twitter-api-client";

const Bearer =
  "Bearer AAAAAAAAAAAAAAAAAAAAAHedMAEAAAAARxe3nC9OlyRB4dax7rnSUadvgtE%3DiVoXadh30W2QcU7P3wy93iSq8iIgL7WXJ54NbrMkibr4PN8qG2";

const twitterClient = new TwitterClient({
  apiKey: "YdgtT9hZYkPT0feFW2Igs2v1B",
  apiSecret: "TRGISyHtyv8twd92aZZlec31Mmluuuz1PuH8dkzyOVp5em6Rg",
  accessToken: "1354250606375010304-V2jVRBiME50QO1gvFFR2ZdX54KRFNy",
  accessTokenSecret: "2HmGmeg5B6ViWSI4VAOKpViXv66lu1OoNN4jLXtOIJas8",
});

const data = await twitterClient.accountsAndUsers.usersSearch({ q: "twitterDev" });
console.log(data);

const hello = () => {};
hello();

console.log(data);

export default twitterClient;
