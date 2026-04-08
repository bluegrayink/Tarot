let cardsData = [
  { name: "The Beginning", short: "awal baru dan peluang", meaning: "Kamu sedang berada di awal baru. Ini saat yang tepat untuk mulai sesuatu." },
  { name: "The Collapse", short: "perubahan tiba-tiba", meaning: "Ada sesuatu yang runtuh, tapi ini membuka jalan baru." },
  { name: "The Choice", short: "dilema keputusan", meaning: "Kamu sedang di persimpangan dan harus memilih." },
  { name: "The Growth", short: "perkembangan stabil", meaning: "Usaha kamu mulai menunjukkan hasil." },
  { name: "The Shadow", short: "ketakutan tersembunyi", meaning: "Ada ketakutan yang mempengaruhi kamu." },
  { name: "The Connection", short: "hubungan dan relasi", meaning: "Ada koneksi penting dalam hidup kamu." },
  { name: "The Temptation", short: "godaan dan distraksi", meaning: "Hati-hati dengan hal yang mengalihkan fokus kamu." },
  { name: "The Control", short: "kendali dan disiplin", meaning: "Kamu punya kendali lebih dari yang kamu kira." },
  { name: "The Opportunity", short: "kesempatan datang", meaning: "Ada peluang yang harus segera kamu ambil." },
  { name: "The Drift", short: "kehilangan arah", meaning: "Kamu sedang bingung arah hidup." },
  { name: "The Passion", short: "ambisi dan energi", meaning: "Energi kamu sedang tinggi, gunakan dengan benar." },
  { name: "The Illusion", short: "tidak sesuai realita", meaning: "Tidak semua yang terlihat itu benar." },
  { name: "The Pause", short: "berhenti sejenak", meaning: "Ini saatnya istirahat dan refleksi." },
  { name: "The Clarity", short: "jawaban mulai jelas", meaning: "Kamu mulai melihat arah yang benar." },
  { name: "The Outcome", short: "hasil akhir", meaning: "Ini adalah hasil dari perjalanan kamu." }
];

let selectedCards = [];
let mode = 0;
let shuffledCards = [];

// shuffle random (lebih proper)
function shuffle(array) {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// render kartu
function renderAllCards() {
  let area = document.getElementById("card-area");
  area.innerHTML = "";

  shuffledCards = shuffle(cardsData);

  let container = document.createElement("div");
  container.className = "card-grid";

  let row1 = document.createElement("div");
  let row2 = document.createElement("div");
  let row3 = document.createElement("div");

  row1.className = "row";
  row2.className = "row";
  row3.className = "row";

  shuffledCards.forEach((card, index) => {
    let div = document.createElement("div");
    div.className = "card";

    div.onclick = () => pickCard(div, card);

    if (index < 5) row1.appendChild(div);
    else if (index < 10) row2.appendChild(div);
    else row3.appendChild(div);
  });

  container.appendChild(row1);
  container.appendChild(row2);
  container.appendChild(row3);

  area.appendChild(container);
}

// pilih mode
function setMode(m) {
  mode = m;
  selectedCards = [];

  document.getElementById("result").innerHTML = "";
  document.getElementById("instruction").innerText =
    `Pilih ${mode} kartu yang kamu rasakan paling menarik`;
}

// pilih kartu
function pickCard(div, card) {
  if (mode === 0) return alert("Pilih mode dulu!");
  if (selectedCards.includes(card)) return;
  if (selectedCards.length >= mode) return;

  div.classList.add("flipped");

  setTimeout(() => {
    div.innerHTML = `<p style="padding:10px">${card.name}</p>`;
  }, 300);

  selectedCards.push(card);

  if (selectedCards.length === mode) {
    showResult();
  }
}

// hasil
function showResult() {
  let resultDiv = document.getElementById("result");

  let story = generateStory(selectedCards);

  resultDiv.innerHTML = `
    <div class="result-card">
      <h2>🔮 Your Reading</h2>
      <p>${story}</p>
    </div>
  `;
}

// generate narasi
function generateStory(cards) {
  let a = cards.map(c => c.short);

  let endings = [
    "Coba kamu pikir lagi, ini relate ga sama kondisi kamu sekarang?",
    "Biasanya ini kejadian tanpa disadari.",
    "Ini sering terjadi di fase seperti ini.",
    "Ga semua orang sadar mereka ada di posisi ini."
  ];

  let ending = endings[Math.floor(Math.random() * endings.length)];

  // 1 kartu
  if (cards.length === 1) {
    return cards[0].meaning + "<br><br>" + ending;
  }

  // 3 kartu
  if (cards.length === 3) {
    let templates = [
      `Kamu lagi berada di fase ${a[1]}, dan ini sebenarnya berkaitan dengan ${a[0]}. Kalau berlanjut, ini bisa mengarah ke ${a[2]}.`,
      
      `Kalau dilihat dari pilihan kamu, ${a[0]} masih kebawa sampai sekarang. Saat ini kamu di kondisi ${a[1]}, dan ini bisa berkembang jadi ${a[2]}.`,
      
      `Pilihan kamu menunjukkan bahwa ${a[0]} belum selesai, dan sekarang berubah jadi ${a[1]}. Kalau terus seperti ini, hasilnya bisa ${a[2]}.`,
      
      `Situasi kamu sekarang cukup jelas. Dari ${a[0]} ke ${a[1]}, dan kemungkinan akan menuju ${a[2]}.`,
      
      `Ada sesuatu dari ${a[0]} yang muncul lagi sekarang dalam bentuk ${a[1]}. Arah ini bisa berakhir di ${a[2]}.`
    ];

    let text = templates[Math.floor(Math.random() * templates.length)];
    return text + "<br><br>" + ending;
  }

  // 5 kartu
  if (cards.length === 5) {
    let templates = [
      `Situasi kamu sekarang berada di ${a[0]}, tapi ada tantangan berupa ${a[1]}. Yang sering ga disadari adalah ${a[2]}. Kalau kamu bisa menghadapi ini dengan ${a[3]}, hasilnya bisa menuju ${a[4]}.`,
      
      `Kondisi kamu sekarang cukup kompleks. ${a[0]} jadi dasar, tapi ${a[1]} bikin semuanya ga stabil. Ada juga ${a[2]} yang diam-diam berpengaruh. Cara terbaik adalah ${a[3]}, supaya arah akhirnya bisa ${a[4]}.`,
      
      `Dari yang terlihat, kamu lagi di fase ${a[0]}. Tapi sebenarnya masalahnya ada di ${a[1]}. Ditambah lagi ${a[2]} yang bikin makin rumit. Kalau kamu ambil langkah ${a[3]}, hasilnya bisa berubah ke ${a[4]}.`
    ];

    let text = templates[Math.floor(Math.random() * templates.length)];
    return text + "<br><br>" + ending;
  }
}

// INIT
renderAllCards();
