export default async function handler(req, res) {
  const {
    source_ids = "",
    genres = "",
    types = "",
    regions = "CH",
  } = req.query;

  const url =
    `https://api.watchmode.com/v1/list-titles/?apiKey=${process.env.WATCHMODE_API_KEY}` +
    `&source_ids=${source_ids}` +
    `&genres=${genres}` +
    `&types=${types}` +
    `&regions=${regions}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Watchmode request failed" });
  }
}
