import { Story } from "../../models/index.js";

class StorySeeder {
  static async seed() {
    const storyData = [
      {
        title: "Brand new story",
        description: "Local news freshly made",
        rating: "3",
        url: "https://www.eltiempo.com/",
        urlToImage:
          "https://www.eltiempo.com/files/article_main/uploads/2021/02/06/601f0c29e6cdc.jpeg",
        userId: "1",
      },
      {
        title: "Second newer story",
        description: "Local but a day old news",
        rating: "3.5",
        url: "https://www.eltiempo.com/",
        urlToImage:
          "https://www.eltiempo.com/files/article_main/uploads/2021/02/06/601f0c29e6cdc.jpeg",
        userId: "1",
      },
      {
        title: "Noticias del dia",
        description: "Otra noticia por favor",
        rating: "2.5",
        url: "https://www.eltiempo.com/",
        urlToImage:
          "https://www.eltiempo.com/files/article_main/uploads/2021/02/06/601f0c29e6cdc.jpeg",
        userId: "1",
      },
    ];

    for (const singleStoryData of storyData) {
      const currentStory = await Story.query().findOne({ title: singleStoryData.title });
      if (!currentStory) {
        await Story.query().insert(singleStoryData);
      }
    }
  }
}

export default StorySeeder;
