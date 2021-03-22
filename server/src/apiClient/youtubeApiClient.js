import { google } from "googleapis";

class googleApiClient {
  static async getYoutubeVideosData() {
    try {
      const response = await google.youtube("v3").playlistItems.list({
        auth: "AIzaSyBKcINx71DJH6DwR_BLPHg6p8ROl4kFxN8",
        playlistId: "PUuDbQ-ui3Fj7Kr5Wf9Y_7RA",
        maxResults: 20,
        part: "contentDetails",
        origin: "http://localhost:3000",
        host: "https://www.youtube.com",
      });
      const content = [];
      response.data.items.map((data) => {
        content.push(data);
      });
      return content;
    } catch (error) {
      return { error: error.mesage };
    }
  }
}

export default googleApiClient;
