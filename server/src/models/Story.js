const Model = require("./Model.js");

class Story extends Model {
  static get tableName() {
    return "stories";
  }
}

module.exports = Story;
