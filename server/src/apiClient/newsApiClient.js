import got from "got";

const newsApiKey = "4f667e85ebf64b24919832a4ff1475ed";

class newsApiClient {
  static async getNewsData() {
    try {
      const url = `http://newsapi.org/v2/top-headlines?country=co&apiKey=${newsApiKey}`;
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      const parsedBody = JSON.parse(responseBody);
      const allStories = parsedBody.articles.map((data) => {
        let url = data.url;
        //isolate url
        //run split and pop on url
        //save it to a variable as maybe id
        //take data object and add new key value pair to it
        //concat the id to object

        // let id = url.split("article-").pop();
        let id = url.substr(url.length - 6);

        const newStory = {
          ...data,
          apiId: id,
        };
        // debugger;
        return newStory;
      });
      // debugger;
      // return parsedBody;
      return allStories;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default newsApiClient;
