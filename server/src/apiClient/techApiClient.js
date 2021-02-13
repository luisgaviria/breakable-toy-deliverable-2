// import got from "got";

// const newsApiKey = "4f667e85ebf64b24919832a4ff1475ed";

// class techNewsApiClient {
//   static async getNewsData() {
//     try {
//       const url = `http://newsapi.org/v2/top-headlines?category=technology&apiKey=${newsApiKey}`;
//       const apiResponse = await got(url);
//       const responseBody = apiResponse.body;
//       const parsedBody = JSON.parse(responseBody);
//       const allStories = parsedBody.articles.map((data) => {
//         let url = data.url;
//         let id = url.substr(url.length - 6);
//         const newStory = {
//           ...data,
//           apiId: id,
//         };
//         return newStory;
//       });

//       debugger;

//       return allStories;
//     } catch (error) {
//       return { error: error.message };
//     }
//   }
// }

// export default techNewsApiClient;
