# ⚙️ Business Logic & Heavy Services

## Responsibility
Encapsulates application business logic, trace JSON pre-rendering engines, and LRU cache management separated from HTTP controllers.

## Key Services
- `traceGenerator.js`: Server-side JS trace evaluator fallback service.
- `cacheService.js`: In-memory LRU or Redis caching service for trace payloads.
