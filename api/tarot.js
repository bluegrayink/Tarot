export default async function handler(req, res) {
  const { name, category, cards } = req.body;

  const prompt = `
Kamu adalah pembaca tarot profesional.

Gunakan gaya bahasa santai, natural, dan terasa personal.

Nama: ${name}
Kategori: ${category}
Kartu:
${cards.map(c => c.name + " (" + c.short + ")").join(", ")}

Buat pembacaan tarot yang terasa seperti ngobrol langsung.
`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-5.3",
      input: prompt
    })
  });

  const data = await response.json();

  res.status(200).json({
    result: data.output[0].content[0].text
  });
}
