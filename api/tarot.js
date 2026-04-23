export default async function handler(req, res) {

  // 🔥 CORS HEADER (WAJIB)
  res.setHeader("Access-Control-Allow-Origin", "https://bluegrayink.github.io");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 🔥 HANDLE PREFLIGHT
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const { name, category, cards } = req.body || {};

    const prompt = `
Nama: ${name}
Kategori: ${category}
Kartu:
${cards.map(c => c.name + " (" + c.short + ")").join(", ")}

Buat pembacaan tarot yang santai, natural, dan personal.
`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: "OpenAI error",
        detail: data
      });
    }

    let result = data.output?.[0]?.content?.[0]?.text;

    return res.status(200).json({
      result: result || "Gagal generate"
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
