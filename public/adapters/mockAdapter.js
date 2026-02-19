export class MockAdapter {

  constructor() {
    this.quoteHandlers = [];
  }

  onQuote(cb) {
    this.quoteHandlers.push(cb);
  }

  emitQuote(q) {
    this.quoteHandlers.forEach(cb => cb(q));
  }

  sendRFQ(data) {
    const peers = ["Peer_A", "Peer_B", "Peer_C"];
    const base = 60000;

    peers.forEach(peer => {
      const latency = Math.random() * 3000 + 1000;

      setTimeout(() => {
        const quote = {
          peer,
          price: (base + (Math.random() - 0.5) * 2000).toFixed(2),
          fee: (Math.random() * 0.3).toFixed(2),
          status: "active"
        };

        this.emitQuote(quote);

      }, latency);
    });
  }
}
