const Model = require("./Model");

class Review extends Model {
  static get tableName() {
    return "reviews";
  }

  static get relationMappings() {
    const Story = require("./Story.js");
    const User = require("./User.js");
    return {
      story: {
        relation: Model.BelongsToOneRelation,
        modelClass: Story,
        join: {
          from: "reviews.storyId",
          to: "stories.id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "reviews.userId",
          to: "users.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["rating", "comments"],
      properties: {
        rating: { type: ["string", "float", "integer"], minLength: 1, maxLength: 255 },
        comments: { type: "string", minLength: 1, maxLength: 255 },
        storyId: { type: ["string", "integer"] },
      },
    };
  }
}

module.exports = Review;
