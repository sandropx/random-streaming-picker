import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.VITE_WATCHMODE_API_KEY;

async function fetchGenres() {
  try {
    const response = await fetch(
      `https://api.watchmode.com/v1/genres/?apiKey=${apiKey}`,
    );

    const data = await response.json();

    console.log(data);

    fs.writeFileSync("./src/data/genres.json", JSON.stringify(data, null, 2));

    console.log("Genres sauvegardés !");
  } catch (error) {
    console.error(error);
  }
}

fetchGenres();
