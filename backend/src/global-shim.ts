import * as crypto from 'crypto';

if (!global.crypto) {
  Object.defineProperty(global, 'crypto', {
    value: crypto,
    writable: true,
    configurable: true
  });
} 