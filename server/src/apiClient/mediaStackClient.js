import got from "got";

const mediaStackKey = "";

class mediaStackClient {
  static async getStackData() {
    try {
      const url = `http://api.mediastack.com/v1/news?access_key=${mediaStackKey}c&sources=es`;

      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      debugger;
      console.log(responseBody);
      return responseBody;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default mediaStackClient;
