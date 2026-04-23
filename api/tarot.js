export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const { name, category, cards } = req.body || {};

    if (!cards || !Array.isArray(cards)) {
      return res.status(400).json({ error: "Cards tidak valid" });
    }

    // 🔥 DEBUG ENV
    console.log("API KEY ADA?", !!process.env.OPENAI_API_KEY);

    const prompt = `
Nama: ${name}
Kategori: ${category}
Kartu:
${cards.map(c => c.name + " (" + c.short + ")").join(", ")}

Buat pembacaan tarot yang santai, natural, dan tidak kaku.
`;

    // 🔥 PAKAI API BARU (LEBIH STABIL)
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

    console.log("OPENAI RAW:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return res.status(500).json({
        error: "OpenAI error",
        detail: data
      });
    }

    // 🔥 AMBIL TEXT DENGAN AMAN
    let result = "";

    if (data.output && data.output[0]?.content) {
      result = data.output[0].content[0].text;
    }

    if (!result) {
      return res.status(500).json({
        error: "AI tidak mengembalikan teks",
        raw: data
      });
    }

    return res.status(200).json({ result });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({
      error: err.message || "Unknown error"
    });
  }
}
