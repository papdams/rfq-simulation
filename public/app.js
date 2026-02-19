console.log("App loaded");

const sendBtn = document.getElementById("sendBtn");
const quotesContainer = document.getElementById("quotes");
const logBox = document.getElementById("log");

let quotes = [];

function log(message) {
  const time = new Date().toLocaleTimeString();
  logBox.innerHTML += `[${time}] ${message}<br>`;
  logBox.scrollTop = logBox.scrollHeight;
}

function renderQuotes() {
  quotesContainer.innerHTML = "";

  quotes.forEach((quote, index) => {
    const div = document.createElement("div");
    div.className = "quote-card";

    div.innerHTML = `
      <strong>${quote.peer}</strong><br>
      Price: ${quote.price}<br>
      Fee: ${quote.fee}%<br>
      <button onclick="acceptQuote(${index})">Accept</button>
    `;

    quotesContainer.appendChild(div);
  });
}

function generateQuotes(asset) {
  const basePrices = {
    BTC: 60000,
    ETH: 3000,
    USDT: 1
  };

  const peers = ["Peer_A", "Peer_B", "Peer_C"];
  const base = basePrices[asset];

  peers.forEach(peer => {
    const delay = Math.random() * 3000 + 1000;

    setTimeout(() => {
      const quote = {
        peer,
        price: (base + (Math.random() - 0.5) * 2000).toFixed(2),
        fee: (Math.random() * 0.3).toFixed(2)
      };

      quotes.push(quote);
      log(`Quote received from ${peer}`);
      renderQuotes();
    }, delay);
  });
}

function sendRFQ() {
  const asset = document.getElementById("fromAsset").value;
  const amount = document.getElementById("amount").value;

  if (!amount) {
    alert("Please enter amount");
    return;
  }

  quotes = [];
  renderQuotes();

  log(`RFQ sent: ${amount} ${asset}`);

  generateQuotes(asset);
}

function acceptQuote(index) {
  const quote = quotes[index];

  log(`Accepted quote from ${quote.peer}`);
  log("Locking funds...");
  
  setTimeout(() => {
    log("Settlement completed ✅");
  }, 2000);
}

sendBtn.addEventListener("click", sendRFQ);
