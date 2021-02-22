/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("stories", (table) => {
    table.bigIncrements("id").primary();
    table.string("author");
    table.string("content", 1000000);
    table.string("publishedAt");
    table.string("title").notNullable();
    table.string("description", 1000000).notNullable();
    table.float("rating");
    table.string("url", 1000000);
    table.string("urlToImage", 1000000).notNullable();
    table.string("apiId");
    table.bigInteger("userId").unsigned().index().notNullable().references("users.id");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("stories");
};
