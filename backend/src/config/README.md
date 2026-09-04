# ⚙️ Server Configuration & Database Setup

## Responsibility
Manages environment configurations, database connections (MongoDB/Mongoose), and Redis caching clients.

## Key Files
- `db.js`: Handles Mongoose connection lifecycle, connection retry strategies, and error handling.
- `redis.js`: (Optional) Redis cache client setup for high-speed preset trace retrieval.
