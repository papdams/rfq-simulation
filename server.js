import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const peers = [
  { name: "Peer_A" },
  { name: "Peer_B" },
  { name: "Peer_C" }
];

function generateQuote(basePrice, amount) {
  const priceFluctuation = (Math.random() - 0.5) * 10;
  const fee = +(Math.random() * 0.3 + 0.1).toFixed(2);
  const price = +(basePrice + priceFluctuation).toFixed(2);

  const effectivePrice = +(price * (1 + fee / 100)).toFixed(2);
  const total = +(effectivePrice * amount).toFixed(2);

  return { price, fee, effectivePrice, total };
}

app.post("/api/rfq", (req, res) => {
  const { asset, amount } = req.body;

  if (!asset || !amount) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const basePrice = 850;

  const quotes = peers.map((peer) => {
    const q = generateQuote(basePrice, amount);
    return {
      peer: peer.name,
      ...q
    };
  });

  res.json({
    timestamp: Date.now(),
    asset,
    amount,
    quotes
  });
});

app.listen(PORT, () => {
  console.log(`RFQ Simulator running on http://localhost:${PORT}`);
});
