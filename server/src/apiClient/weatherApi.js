import got from "got";

const weatherApiKey = "e286e1788c8c439f8bb32506212801";

class weatherApiClient {
  static async getWeatherData() {
    try {
      const url = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=apartado antioquia`;
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      const parsedBody = JSON.parse(responseBody);

      return parsedBody;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default weatherApiClient;
