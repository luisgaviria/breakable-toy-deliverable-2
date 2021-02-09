import ReviewSerializer from "./ReviewSerializer.js";

class StorySerializer {
  static async showData(story) {
    const allowedAttributes = [
      "id",
      "author",
      "content",
      "publishedAt",
      "title",
      "description",
      "rating",
      "url",
      "urlToImage",
    ];

    let serializedStory = {};
    for (const attribute of allowedAttributes) {
      serializedStory[attribute] = story[attribute];
    }
    return serializedStory;
  }

  static async showDetails(story) {
    const allowedAttributes = [
      "id",
      "author",
      "content",
      "publishedAt",
      "title",
      "description",
      "rating",
      "url",
      "urlToImage",
    ];
    let serializedStory = {};
    for (const attribute of allowedAttributes) {
      serializedStory[attribute] = story[attribute];
    }
    const reviews = await story.$relatedQuery("reviews");
    serializedStory.reviews = Promise.all(
      reviews.map((review) => {
        return ReviewSerializer.showData(review);
      })
    );
  }
}

export default StorySerializer;
