# Node Redis Server (Custom In-Memory Redis Clone)
A simple, modular, Redis-like in-memory database built with Node.js.  
This project is designed for learning purposes :]




# 📌 Roadmap (TODO)
### 1️⃣ Phase 1 — Redis Core Commands

- [x] SET / GET / DEL
- [x] TTL / EXPIRE
- [x] INCR / DECR
- [x] Basic Pub/Sub
- [ ] Lists → LPUSH, RPUSH, LPOP, RPOP
- [ ] Hashes → HSET, HGET, HDEL, HGETALL
- [ ] Key pattern scanning → KEYS <pattern>

### 2️⃣ Phase 2 — Persistence

- [ ] Append-Only File (AOF)
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

## 🟢 Current Development Stage

Currently working on:

**➡ Phase 1 — Completing Redis Core Features (Pub/Sub implemented)**



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



## 🧩 Current Features

- Clean 3-layer architecture (Controller → Service → Core)
- Dynamic routing / module auto-loader 
- In-memory key/value store 
- TTL manager with background cleanup 
- Pub/Sub (with optional SSE endpoint)
- Automatic Postman Collection generator 
- Basic centralized error handling


