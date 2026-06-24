export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const response = await fetch(
      `https://api.watchmode.com/v1/title/${id}/details/?apiKey=${process.env.WATCHMODE_API_KEY}&append_to_response=seasons,sources`,
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Details request failed" });
  }
}
