<h1>Node Redis Server</h1>

<p>

I'm building my own Redis-like server using Node.js and Express.
This project is focused on learning, clean architecture, and scalable code organization.
It uses:
- Modular Architecture (feature-based structure for better scalability & maintainability)
- Separation of Concerns (SoC) (controllers for HTTP, services for logic, datastore for persistence)
- Single Responsibility Principle (SRP) from SOLID (each layer has exactly one job)
- Clean Architecture principles (isolated domain logic + easy to test components)
- Auto-module loader (convention-over-configuration to register routes automatically)
- Domain Encapsulation / Lightweight DDD (key-value, Pub/Sub, Lists treated as isolated domains)

</p>



<h3>📌 Roadmap (TODO)</h3>

### 1️⃣ Phase 1 — Redis Core Commands 

- [x] SET / GET / DEL
- [x] TTL / EXPIRE
- [x] INCR / DECR
- [x] Basic Pub/Sub
- [x] Lists → LPUSH, RPUSH, LPOP, RPOP
- [x] Hashes → HSET, HGET, HDEL, HGETALL

### 2️⃣ Phase 2 — Persistence (Currently working here 🟢)

- [x] Append-Only File (AOF)
- [ ] Snapshot system (RDB-like)

### 3️⃣ Phase 3 — Performance / Scaling

- [ ] Locking (SETNX)

- [ ] Rate limiting

- [ ] Basic sharding

- [ ] Worker threads for parallelism

### 4️⃣ Phase 4 — Protocol + TCP Server

- [ ] Native TCP server

- [ ] RESP protocol support (Redis wire protocol)

- [ ] Full test coverage




## 🚀 Getting Started

### Install dependencies
```bash
npm install
```

Run the server
```bash
node server.js
```
The server runs on port 3000 by default.



## 🧪 Auto-Generated Postman Collection

This API automatically generates a Postman Collection based on all loaded modules and routes.

Get the Postman Collection:

```bash
GET /api/postman
```
The response includes:

- All available endpoints
- HTTP methods 
- Request bodies (auto-detected)
- Path parameters 
- Descriptions


Import into Postman:

- Open Postman 
- Click Import → Link 
- Enter: `http://localhost:3000/api/postman`

Postman will automatically import the full API collection

<hr>

Gonna add more details soon  :)
