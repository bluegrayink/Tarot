let cardsData = [
  {
    name: "The Beginning",
    short: "awal baru dan peluang",
    meaning: "Kamu sedang berada di awal baru. Ini saat yang tepat untuk mulai sesuatu."
  },
  {
    name: "The Collapse",
    short: "perubahan tiba-tiba",
    meaning: "Ada sesuatu yang runtuh, tapi ini membuka jalan baru."
  },
  {
    name: "The Choice",
    short: "dilema keputusan",
    meaning: "Kamu sedang di persimpangan dan harus memilih."
  },
  {
    name: "The Growth",
    short: "perkembangan stabil",
    meaning: "Usaha kamu mulai menunjukkan hasil."
  },
  {
    name: "The Shadow",
    short: "ketakutan tersembunyi",
    meaning: "Ada ketakutan yang mempengaruhi kamu."
  },
  {
    name: "The Connection",
    short: "hubungan dan relasi",
    meaning: "Ada koneksi penting dalam hidup kamu."
  },
  {
    name: "The Temptation",
    short: "godaan dan distraksi",
    meaning: "Hati-hati dengan hal yang mengalihkan fokus kamu."
  },
  {
    name: "The Control",
    short: "kendali dan disiplin",
    meaning: "Kamu punya kendali lebih dari yang kamu kira."
  },
  {
    name: "The Opportunity",
    short: "kesempatan datang",
    meaning: "Ada peluang yang harus segera kamu ambil."
  },
  {
    name: "The Drift",
    short: "kehilangan arah",
    meaning: "Kamu sedang bingung arah hidup."
  },
  {
    name: "The Passion",
    short: "ambisi dan energi",
    meaning: "Energi kamu sedang tinggi, gunakan dengan benar."
  },
  {
    name: "The Illusion",
    short: "tidak sesuai realita",
    meaning: "Tidak semua yang terlihat itu benar."
  },
  {
    name: "The Pause",
    short: "berhenti sejenak",
    meaning: "Ini saatnya istirahat dan refleksi."
  },
  {
    name: "The Clarity",
    short: "jawaban mulai jelas",
    meaning: "Kamu mulai melihat arah yang benar."
  },
  {
    name: "The Outcome",
    short: "hasil akhir",
    meaning: "Ini adalah hasil dari perjalanan kamu."
  }
];

let selectedCards = [];
let mode = 0;

renderAllCards();

// tampilkan semua kartu
function renderAllCards() {
  let area = document.getElementById("card-area");
  area.innerHTML = "";

  cardsData.forEach((card) => {
    let div = document.createElement("div");
    div.className = "card";

    div.onclick = () => pickCard(div, card);

    area.appendChild(div);
  });
}

// set mode
function setMode(m) {
  mode = m;
  selectedCards = [];

  document.getElementById("result").innerHTML = "";
  document.getElementById("instruction").innerText =
    `Pilih ${mode} kartu sekarang`;
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

// narasi
function generateStory(cards) {
  let a = cards.map(c => c.short);

  if (cards.length === 1) {
    return cards[0].meaning;
  }

  if (cards.length === 3) {
    return `
    Dari pilihan kamu, ada pola yang cukup kuat.

    Awalnya kamu berada dalam kondisi ${a[0]}, yang ternyata masih berpengaruh sampai sekarang.

    Saat ini kamu sedang masuk ke fase ${a[1]}, dimana ada perubahan atau dinamika yang cukup terasa.

    Kalau dilihat ke depan, arah ini cenderung akan berkembang menjadi ${a[2]}.

    Semua ini bukan kebetulan, tapi proses yang memang sedang kamu jalani.
    `;
  }

  if (cards.length === 5) {
    return `
    Situasi kamu sekarang cukup kompleks.

    Kamu sedang berada dalam kondisi ${a[0]}, tapi juga harus menghadapi ${a[1]}.

    Tanpa kamu sadari, ada faktor ${a[2]} yang ikut mempengaruhi arah kamu.

    Pendekatan terbaik untuk kamu sekarang adalah ${a[3]}.

    Jika dijalani dengan konsisten, kemungkinan besar akan menuju ${a[4]}.
    `;
  }
}
