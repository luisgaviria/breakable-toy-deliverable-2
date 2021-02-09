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
}

export default StorySerializer;
