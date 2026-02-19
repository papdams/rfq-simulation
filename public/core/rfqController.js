import { describe, it, expect, vi } from "vitest";
import { RFQController } from "../core/rfqController.js";

class FakeAdapter {
  constructor() {
    this.handlers = [];
  }

  onQuote(cb) {
    this.handlers.push(cb);
  }

  sendRFQ(data) {
    this.sentData = data;
  }

  simulateQuote(q) {
    this.handlers.forEach(h => h(q));
  }
}

describe("RFQController", () => {

  it("should send RFQ to adapter", () => {
    const adapter = new FakeAdapter();
    const controller = new RFQController(adapter);

    document.body.innerHTML = `
      <select id="fromAsset"><option>BTC</option></select>
      <input id="amount" value="1" />
    `;

    controller.send();

    expect(adapter.sentData).toBeDefined();
    expect(adapter.sentData.from).toBe("BTC");
  });

  it("should receive quote from adapter", () => {
    const adapter = new FakeAdapter();
    const controller = new RFQController(adapter);

    let received = null;

    controller.onQuote((q) => {
      received = q;
    });

    adapter.simulateQuote({ peer: "Peer_A", price: 60000 });

    expect(received.peer).toBe("Peer_A");
  });

});
