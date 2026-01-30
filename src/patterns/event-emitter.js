/**
 * Pub/Sub (Event Emitter) Pattern in JavaScript
 */

class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(listener);

    // Unsubscribe handle
    return () => this.off(eventName, listener);
  }

  once(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener.apply(this, args);
    };
    wrapper.originalListener = listener;
    return this.on(eventName, wrapper);
  }

  off(eventName, listener) {
    if (!this.events.has(eventName)) return;

    const listeners = this.events.get(eventName).filter(
      (l) => l !== listener && l.originalListener !== listener
    );

    if (listeners.length === 0) {
      this.events.delete(eventName);
    } else {
      this.events.set(eventName, listeners);
    }
  }

  emit(eventName, ...args) {
    if (!this.events.has(eventName)) return false;

    // Clone listeners to avoid mutations during iteration
    const listeners = [...this.events.get(eventName)];
    for (const listener of listeners) {
      listener.apply(this, args);
    }
    return true;
  }

  listenerCount(eventName) {
    return this.events.has(eventName) ? this.events.get(eventName).length : 0;
  }

  removeAllListeners(eventName) {
    if (eventName) {
      this.events.delete(eventName);
    } else {
      this.events.clear();
    }
  }
}

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing EventEmitter ---');

  const emitter = new EventEmitter();
  let callCount = 0;
  let receivedData = null;

  const unsubscribe = emitter.on('data', (data) => {
    callCount++;
    receivedData = data;
  });

  emitter.emit('data', { id: 1 });
  console.assert(callCount === 1 && receivedData.id === 1, 'Event emit failed');

  // Once test
  let onceCount = 0;
  emitter.once('single', () => onceCount++);
  emitter.emit('single');
  emitter.emit('single');
  console.assert(onceCount === 1, 'Once listener failed');

  // Unsubscribe test
  unsubscribe();
  emitter.emit('data', { id: 2 });
  console.assert(callCount === 1, 'Unsubscribe failed');

  console.log('✓ All EventEmitter tests passed!');
}

module.exports = { EventEmitter };
