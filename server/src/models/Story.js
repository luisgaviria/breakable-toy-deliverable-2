const Model = require("./Model.js");
const uniqueFactory = require("objection-unique");

const unique = uniqueFactory({
  fields: ["title"],
  identifiers: ["id"],
});

class Story extends unique(Model) {
  static get tableName() {
    return "stories";
  }
  static get relationMappings() {
    const { Review, 
        // User 
    } = require("./index");
    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "stories.id",
          to: "reviews.storyId",
        },
      },
      // user: {
      //   relation: Model.BelongsToOneRelation,
      //   modelClass: User,
      //   join: {
      //     from: "stories.userId",
      //     to: "users.id",
      //   },
      // },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "description", "urlToImage"],
      author: { type: "string" },
      content: { type: "string" },
      publishedAt: { type: "string" },
      title: { type: "string", minLength: 1, maxLength: 300 },
      description: { type: "string", minLength: 1 },
      rating: { type: ["string", "float"] },
      url: { type: "string" },
      urlToImage: { type: "string" },
    };
  }
}

module.exports = Story;
