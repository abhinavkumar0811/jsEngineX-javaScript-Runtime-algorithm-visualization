# 🛡️ Express Middlewares

## Responsibility
Contains request processing middlewares including error handling, rate limiting, request validation, and security headers.

## Middlewares
- `errorHandler.js`: Centralized express error catch-all middleware.
- `rateLimiter.js`: API rate limiting middleware using `express-rate-limit`.
- `validateSnippet.js`: Code snippet length validation and safety sanitization.
