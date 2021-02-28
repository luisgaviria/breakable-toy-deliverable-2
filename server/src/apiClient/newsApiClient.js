import got from "got";

import config from "../../src/config.js";

const newsApiKey = "4f667e85ebf64b24919832a4ff1475ed";

class newsApiClient {
  static async getNewsData() {
    try {
      const url = `http://newsapi.org/v2/top-headlines?country=co&apiKey=${newsApiKey}`;
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      const parsedBody = JSON.parse(responseBody);
      const allStories = parsedBody.articles.map((data) => {
        let id = data.publishedAt;
        const newStory = {
          ...data,
          apiId: id,
        };
        return newStory;
      });

      return allStories;
    } catch (error) {
      return { error: error.message };
    }
  }
  static async getScienceData() {
    try {
      const url = `http://newsapi.org/v2/top-headlines?category=science&country=us&apiKey=${newsApiKey}`;
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      const parsedBody = JSON.parse(responseBody);

      const allStories = parsedBody.articles.map((data) => {
        let id = data.publishedAt;
        const newStory = {
          ...data,
          apiId: id,
        };
        return newStory;
      });

      return allStories;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getSportsData() {
    try {
      const url = `http://newsapi.org/v2/top-headlines?category=sports&country=us&apiKey=${newsApiKey}`;
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      const parsedBody = JSON.parse(responseBody);
      const allStories = parsedBody.articles.map((data) => {
        let id = data.publishedAt;
        const newStory = {
          ...data,
          apiId: id,
        };
        return newStory;
      });

      return allStories;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getTechData() {
    try {
      const url = `http://newsapi.org/v2/top-headlines?category=technology&country=co&apiKey=${newsApiKey}`;
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      const parsedBody = JSON.parse(responseBody);
      const allStories = parsedBody.articles.map((data) => {
        let id = data.publishedAt;
        const newStory = {
          ...data,
          apiId: id,
        };
        return newStory;
      });

      return allStories;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default newsApiClient;
