import fs from "fs";
import path from "path";
import PocketBase from "pocketbase";
const pb = new PocketBase("https://167.172.96.210");

export default defineEventHandler(async (event) => {
  try {
    const collection = await pb.collection("blocks").getFullList(200 /* batch size */, {
      sort: "-created",
    });
    const classString = collection.map((entry) => entry.twClasses).join(' ');

    fs.writeFile('./assets/dynamicTailwindClasses/classes.txt', classString, err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });

    return classString
  } catch (err) {
    console.log("error getting collection", err);
  }
});
