const { AsyncLocalStorage } = require("node:async_hooks");

if (!globalThis.AsyncLocalStorage) {
  globalThis.AsyncLocalStorage = AsyncLocalStorage;
}
