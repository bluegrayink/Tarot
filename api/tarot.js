export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    // 🔥 FIX PENTING: parse body manual
    let body = req.body;

    if (!body) {
      body = await new Promise((resolve) => {
        let data = "";
        req.on("data", chunk => data += chunk);
        req.on("end", () => resolve(JSON.parse(data)));
      });
    }

    const { name, category, cards } = body;

    if (!cards) {
      return res.status(400).json({ error: "Cards tidak ada" });
    }

    const prompt = `
Kamu adalah pembaca tarot profesional dan terbaik di bidangnya.

Nama: ${name}
Kategori: ${category}
Kartu:
${cards.map(c => c.name + " (" + c.short + ")").join(", ")}

Buat pembacaan tarot yang santai, natural, dan terasa personal.
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

    return res.status(200).json({
      result: data.choices?.[0]?.message?.content || "Gagal generate"
    });

  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).json({
      error: err.toString()
    });
  }
}
