let cardsData = [
  { name: "The Beginning", short: "awal baru dan peluang" },
  { name: "The Collapse", short: "perubahan tiba-tiba" },
  { name: "The Choice", short: "dilema keputusan" },
  { name: "The Growth", short: "perkembangan stabil" },
  { name: "The Shadow", short: "ketakutan tersembunyi" },
  { name: "The Connection", short: "hubungan dan relasi" },
  { name: "The Temptation", short: "godaan dan distraksi" },
  { name: "The Control", short: "kendali dan disiplin" },
  { name: "The Opportunity", short: "kesempatan datang" },
  { name: "The Drift", short: "kehilangan arah" },
  { name: "The Passion", short: "ambisi dan energi" },
  { name: "The Illusion", short: "tidak sesuai realita" },
  { name: "The Pause", short: "berhenti sejenak" },
  { name: "The Clarity", short: "jawaban mulai jelas" },
  { name: "The Outcome", short: "hasil akhir" }
];

let selectedCards = [];
let mode = 0;
let shuffledCards = [];

function shuffle(array) {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderAllCards() {
  let area = document.getElementById("card-area");
  area.innerHTML = "";

  shuffledCards = shuffle(cardsData);

  let container = document.createElement("div");
  container.className = "card-grid";

  let rows = [0,1,2].map(() => {
    let r = document.createElement("div");
    r.className = "row";
    return r;
  });

  shuffledCards.forEach((card, index) => {
    let div = document.createElement("div");
    div.className = "card";
    div.onclick = () => pickCard(div, card);

    rows[Math.floor(index/5)].appendChild(div);
  });

  rows.forEach(r => container.appendChild(r));
  area.appendChild(container);
}

function setMode(m) {
  mode = m;
  selectedCards = [];

  document.getElementById("result").innerHTML = "";
  document.getElementById("instruction").innerText =
    `Pilih ${mode} kartu`;
}

function pickCard(div, card) {
  if (mode === 0) return alert("Pilih mode dulu!");
  if (selectedCards.length >= mode) return;

  div.classList.add("flipped");
  div.innerHTML = `<p>${card.name}</p>`;

  selectedCards.push(card);

  if (selectedCards.length === mode) {
    showResult();
  }
}

// 🔥 INI BAGIAN AI
async function showResult() {
  let name = document.getElementById("username").value || "Kamu";
  let category = document.getElementById("category").value;

  let resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "🔮 Membaca energi kamu...";

  try {
    let res = await fetch("/api/tarot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        category,
        cards: selectedCards
      })
    });

    let data = await res.json();

    resultDiv.innerHTML = `
      <div class="result-card">
        <h2>🔮 Reading for ${name}</h2>
        <p>${data.result}</p>
      </div>
    `;
  } catch {
    resultDiv.innerHTML = "⚠️ Gagal ambil hasil";
  }
}

renderAllCards();
