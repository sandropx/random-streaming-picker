export default async function handler(req, res) {
  const {
    source_ids = "",
    genres = "",
    types = "",
    regions = "CH",
  } = req.query;

  const params = new URLSearchParams();

  params.append("apiKey", process.env.WATCHMODE_API_KEY);

  if (source_ids) params.append("source_ids", source_ids);
  if (genres) params.append("genres", genres);
  if (types) params.append("types", types);
  if (regions) params.append("regions", regions);

  const url = `https://api.watchmode.com/v1/list-titles/?${params.toString()}`;

  console.log("KEY:", process.env.WATCHMODE_API_KEY?.slice(0, 6));
  console.log(
    "WATCHMODE URL:",
    url.replace(process.env.WATCHMODE_API_KEY, "***"),
  );

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Watchmode request failed" });
  }
}
