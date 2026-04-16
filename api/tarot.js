export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const { name, category, cards } = req.body || {};

    if (!cards || !Array.isArray(cards)) {
      return res.status(400).json({ error: "Cards tidak valid" });
    }

    // 🔥 CEK API KEY
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "API KEY tidak terbaca di server"
      });
    }

    const prompt = `
Kamu adalah pembaca tarot profesional.

Nama: ${name}
Kategori: ${category}
Kartu:
${cards.map(c => c.name + " (" + c.short + ")").join(", ")}

Buat pembacaan tarot yang natural, santai, dan terasa personal.
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();

    // 🔥 DEBUG OUTPUT
    console.log("OPENAI RESPONSE:", data);

    if (!response.ok) {
      return res.status(500).json({
        error: "OpenAI error",
        detail: data
      });
    }

    return res.status(200).json({
      result: data.choices?.[0]?.message?.content || "Gagal generate"
    });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({
      error: err.toString()
    });
  }
}
