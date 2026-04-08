let cardsData = [];
let selectedCards = [];
let drawCount = 0;

fetch('cards.json')
  .then(res => res.json())
  .then(data => {
    cardsData = data;
  });

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}alet cardsData = [];
let selectedCards = [];
let mode = 0;

fetch('cards.json')
  .then(res => res.json())
  .then(data => {
    cardsData = data;
    renderAllCards();
  });

// tampilkan semua kartu dari awal
function renderAllCards() {
  let area = document.getElementById("card-area");
  area.innerHTML = "";

  cardsData.forEach((card, index) => {
    let div = document.createElement("div");
    div.className = "card";

    div.onclick = () => pickCard(div, card);

    area.appendChild(div);
  });
}

// pilih mode
function setMode(m) {
  mode = m;
  selectedCards = [];
  document.getElementById("result").innerHTML = "";

  document.getElementById("instruction").innerText =
    `Pilih ${mode} kartu yang kamu rasakan paling menarik`;
}

// user pilih kartu
function pickCard(div, card) {
  if (mode === 0) return;
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

// generate narasi lebih natural
function generateStory(cards) {
  let a = cards.map(c => c.short);

  // 1 kartu
  if (cards.length === 1) {
    return cards[0].meaning;
  }

  // 3 kartu (flow halus)
  if (cards.length === 3) {
    return `
    Ada pola yang cukup menarik dari pilihan kamu.

    Di awal, terlihat adanya ${a[0]}, yang kemungkinan besar masih berpengaruh sampai sekarang.

    Saat ini kamu sedang berada dalam fase ${a[1]}, dimana ada perubahan atau dinamika yang sedang berjalan.

    Dan kalau dilihat ke depan, arah ini bisa berkembang menjadi ${a[2]}.

    Ini bukan tentang baik atau buruk, tapi tentang bagaimana kamu merespon setiap fase yang muncul.
    `;
  }

  // 5 kartu (lebih dalam & emosional)
  if (cards.length === 5) {
    return `
    Dari kartu yang kamu pilih, terlihat situasi kamu saat ini cukup kompleks.

    Intinya, kamu sedang berada dalam kondisi ${a[0]}, tapi di saat yang sama juga dihadapkan dengan ${a[1]}.

    Menariknya, ada faktor yang mungkin belum sepenuhnya kamu sadari, yaitu ${a[2]}, yang diam-diam ikut mempengaruhi arah kamu.

    Kalau dilihat lebih dalam, pendekatan terbaik untuk kamu sekarang adalah ${a[3]}.

    Dan jika kamu bisa menjalani proses ini dengan baik, kemungkinan besar semuanya akan mengarah ke ${a[4]}.

    Ini bukan hasil yang instan, tapi lebih ke arah perjalanan yang perlahan mulai menemukan bentuknya.
    `;
  }
}

// tampilkan hasil
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

// START DRAW
function startDraw(count) {
  drawCount = count;
  selectedCards = [];
  document.getElementById("result").innerHTML = "";

  let area = document.getElementById("card-area");
  area.innerHTML = "";

  let shuffled = shuffle([...cardsData]);

  for (let i = 0; i < count; i++) {
    let div = document.createElement("div");
    div.className = "card-back";

    div.onclick = function () {
      if (selectedCards.includes(i)) return;

      div.classList.add("flip");

      setTimeout(() => {
        div.innerHTML = `<p style="padding:10px">${shuffled[i].name}</p>`;
      }, 300);

      selectedCards.push(shuffled[i]);

      if (selectedCards.length === drawCount) {
        showResult();
      }
    };

    area.appendChild(div);
  }
}

// SHOW RESULT
function showResult() {
  let resultDiv = document.getElementById("result");

  // 1 CARD
  if (drawCount === 1) {
    let c = selectedCards[0];
    resultDiv.innerHTML = `
      <div class="result-card">
        <h2>${c.name}</h2>
        <p>${c.meaning}</p>
      </div>
    `;
  }

  // 3 CARD
  if (drawCount === 3) {
    resultDiv.innerHTML = `
      <div class="result-card">
      <h2>🔮 3 Card Reading</h2>
      <p>
      Di masa lalu, kamu mengalami <b>${selectedCards[0].short}</b>.<br><br>
      Saat ini kamu berada di fase <b>${selectedCards[1].short}</b>.<br><br>
      Ke depan kemungkinan mengarah ke <b>${selectedCards[2].short}</b>.
      </p>
      </div>
    `;
  }

  // 5 CARD
  if (drawCount === 5) {
    resultDiv.innerHTML = `
      <div class="result-card">
      <h2>🔮 5 Card Reading</h2>
      <p>
      Situasi kamu: <b>${selectedCards[0].short}</b>.<br><br>
      Tantangan: <b>${selectedCards[1].short}</b>.<br><br>
      Faktor tersembunyi: <b>${selectedCards[2].short}</b>.<br><br>
      Saran: <b>${selectedCards[3].short}</b>.<br><br>
      Hasil: <b>${selectedCards[4].short}</b>.
      </p>
      </div>
    `;
  }
}
