
# Distributed Horizontally Scaled Wallet UI (Frontend)

A sleek, lightweight, and modern **React** Single Page Application (SPA) designed to demonstrate the live processing guarantees, state changes, and atomicity metrics of the backend Distributed Sharded Wallet System.

---

## 💎 Features & Screen Flow

The interface provides a highly visual tracking workspace to observe advanced system design concepts in action:

* **Secure Authentication Pipeline:** Seamless user creation and login with instant programmatic credit of a `$1,000.00` structural test balance.
* **UPI-Style Peer Discovery:** Live endpoint resolution to lookup peer wallets across sharded database spaces transparently using human-readable tags (e.g., `deb@wallet`).
* **Real-time Saga Tracking Panel:** When processing a fund transfer, the application explicitly registers custom UUID **Idempotency Keys** and pulls status hooks sequentially to visualize the transactional phase transit (`INITIATED` ──► `DEBITED` ──► `COMPLETED`).
* **Granular Audit Ledger:** Dedicated accounting visualization page fetching isolated shard histories detailing historic operations, transactional types (`DEBIT`, `CREDIT`, `ROLLBACK`), and exact chronologically precise account snapshot balances.

---

## 🛠️ Tech Stack
* **React 18** (Functional architectures with Hooks)
* **Vite** (Optimized native ESM asset piping compiler)
* **Axios** (Configured request client injecting runtime JWT interceptors)
* **React Router DOM** (Declarative client routing mapping protected application paths)

---