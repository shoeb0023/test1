/**
 * Simple Reactive Data-Binding Store using Proxy & Reflect
 */

let activeEffect = null;

class ReactiveStore {
  constructor(initialState = {}) {
    this.targetMap = new WeakMap();
    this.state = this._reactive(initialState);
  }

  _track(target, key) {
    if (!activeEffect) return;

    let depsMap = this.targetMap.get(target);
    if (!depsMap) {
      depsMap = new Map();
      this.targetMap.set(target, depsMap);
    }

    let dep = depsMap.get(key);
    if (!dep) {
      dep = new Set();
      depsMap.set(key, dep);
    }

    dep.add(activeEffect);
  }

  _trigger(target, key) {
    const depsMap = this.targetMap.get(target);
    if (!depsMap) return;

    const dep = depsMap.get(key);
    if (dep) {
      dep.forEach((effect) => effect());
    }
  }

  _reactive(target) {
    if (target === null || typeof target !== 'object') {
      return target;
    }

    const self = this;
    return new Proxy(target, {
      get(obj, key, receiver) {
        const result = Reflect.get(obj, key, receiver);
        self._track(obj, key);
        return typeof result === 'object' && result !== null
          ? self._reactive(result)
          : result;
      },
      set(obj, key, value, receiver) {
        const oldValue = obj[key];
        const success = Reflect.set(obj, key, value, receiver);
        if (oldValue !== value) {
          self._trigger(obj, key);
        }
        return success;
      }
    });
  }

  watch(effectFn) {
    activeEffect = effectFn;
    effectFn();
    activeEffect = null;
  }
}

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing Proxy Data Binding ---');

  const store = new ReactiveStore({ count: 0, text: 'hello' });
  let watchedValue = 0;

  store.watch(() => {
    watchedValue = store.state.count * 2;
  });

  console.assert(watchedValue === 0, 'Initial effect execution failed');

  store.state.count = 5;
  console.assert(watchedValue === 10, 'Reactive trigger failed');

  store.state.count = 12;
  console.assert(watchedValue === 24, 'Secondary reactive trigger failed');

  console.log('✓ All Proxy Data Binding tests passed!');
}

module.exports = { ReactiveStore };
