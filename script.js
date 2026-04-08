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
