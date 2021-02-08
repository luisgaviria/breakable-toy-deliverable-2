import got from "got";

const newsApiKey = "4f667e85ebf64b24919832a4ff1475ed";

class newsApiClient {
  static async getNewsData() {
    try {
      const url = `http://newsapi.org/v2/top-headlines?country=co&apiKey=${newsApiKey}`;
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      return responseBody;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default newsApiClient;
