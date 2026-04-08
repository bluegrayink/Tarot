let cardsData = [];

fetch('cards.json')
  .then(res => res.json())
  .then(data => {
    cardsData = data;
  });

function getRandomCards(count) {
  let shuffled = [...cardsData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function drawCard(count) {
  let resultDiv = document.getElementById('result');

  // 🔒 LIMIT SYSTEM
  let key = "";
  let limit = 0;

  if (count === 1) {
    key = "limit_1";
    limit = 3;
  }

  if (count === 3) {
    key = "limit_3";
    limit = 2;
  }

  if (count === 5) {
    key = "limit_5";
    limit = 1;
  }

  let used = parseInt(localStorage.getItem(key)) || 0;

  if (used >= limit) {
    resultDiv.innerHTML = `
      <div class="card">
        <h2>⚠️ Limit Tercapai</h2>
        <p>Kamu sudah mencapai batas untuk pembacaan ini.</p>
        <p>Coba tipe pembacaan lain 🔮</p>
      </div>
    `;
    return;
  }

  localStorage.setItem(key, used + 1);

  let cards = getRandomCards(count);
  resultDiv.innerHTML = "";

  // 🃏 1 KARTU
  if (count === 1) {
    let c = cards[0];

    resultDiv.innerHTML = `
      <div class="card">
        <h2>${c.name}</h2>
        <p>${c.meaning}</p>
      </div>
    `;
  }

  // 🔮 3 KARTU (lebih nyambung)
  if (count === 3) {
    let text = `
      <div class="card">
      <h2>🔮 3 Card Reading</h2>
      <p>
      Di masa lalu, kamu mengalami <b>${cards[0].short}</b>, yang membentuk kondisi kamu saat ini.<br><br>

      Saat ini, kamu berada di fase <b>${cards[1].short}</b>, yang menunjukkan adanya perubahan atau perkembangan tertentu.<br><br>

      Jika kamu terus berjalan di jalur ini, kemungkinan besar ke depan akan mengarah ke <b>${cards[2].short}</b>.
      </p>
      </div>
    `;

    resultDiv.innerHTML = text;
  }

  // 🧠 5 KARTU (lebih dalam)
  if (count === 5) {
    let text = `
      <div class="card">
      <h2>🔮 5 Card Reading</h2>
      <p>
      Situasi utama kamu saat ini adalah <b>${cards[0].short}</b>.<br><br>

      Tantangan yang kamu hadapi berkaitan dengan <b>${cards[1].short}</b>.<br><br>

      Tanpa kamu sadari, ada faktor tersembunyi yaitu <b>${cards[2].short}</b> yang ikut mempengaruhi.<br><br>

      Saran terbaik untuk kamu saat ini adalah menghadapi situasi dengan pendekatan <b>${cards[3].short}</b>.<br><br>

      Jika kamu mengikuti arah ini, hasil yang paling mungkin terjadi adalah <b>${cards[4].short}</b>.
      </p>
      </div>
    `;

    resultDiv.innerHTML = text;
  }
}
