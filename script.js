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

// RANDOM SHUFFLE (biar ga bisa ditebak)
function shuffle(array) {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// render semua kartu
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

// narasi lebih natural
function generateStory(cards) {
  let a = cards.map(c => c.short);

  if (cards.length === 1) {
    return cards[0].meaning;
  }

  if (cards.length === 3) {
    return `
    Dari pilihan kamu, ada pola yang cukup menarik.

    Awalnya kamu berada dalam kondisi ${a[0]}, yang tanpa disadari masih berpengaruh sampai sekarang.

    Saat ini kamu sedang berada dalam fase ${a[1]}, yang menunjukkan adanya perubahan atau dinamika dalam hidup kamu.

    Jika dilihat ke depan, arah ini kemungkinan besar akan berkembang menjadi ${a[2]}.

    Semua ini bukan kebetulan, tapi bagian dari proses yang sedang kamu jalani.
    `;
  }

  if (cards.length === 5) {
    return `
    Dari kartu yang kamu pilih, terlihat bahwa situasi kamu saat ini cukup kompleks.

    Kamu sedang berada dalam kondisi ${a[0]}, namun juga dihadapkan dengan ${a[1]}.

    Menariknya, ada faktor tersembunyi yaitu ${a[2]}, yang mungkin belum sepenuhnya kamu sadari.

    Untuk menghadapi ini, pendekatan terbaik adalah ${a[3]}.

    Jika kamu bisa menjalani proses ini dengan baik, kemungkinan besar semuanya akan mengarah ke ${a[4]}.

    Ini bukan sesuatu yang instan, tapi proses yang perlahan akan membentuk hasil akhirnya.
    `;
  }
}

// INIT
renderAllCards();
