import { connection } from "../boot.js";

import StorySeeder from "./seeders/StorySeeder.js";

class Seeder {
  static async seed() {
    console.log("seeding stories...");
    await StorySeeder.seed();

    console.log("done!");
    await connection.destroy();
  }
}

export default Seeder;
