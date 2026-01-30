/**
 * 31-Day JavaScript Mastery Series - Master Barrel Export
 */

module.exports = {
  // Polyfills
  ...require('./polyfills/map'),
  ...require('./polyfills/filter'),
  ...require('./polyfills/reduce'),
  ...require('./polyfills/promise'),

  // Async
  ...require('./async/debounce'),
  ...require('./async/throttle'),
  ...require('./async/promise-combinators'),

  // Patterns
  ...require('./patterns/closure-privacy'),
  ...require('./patterns/event-emitter'),
  ...require('./patterns/reactive'),

  // Utilities
  ...require('./utils/memoize'),
  ...require('./utils/deep-clone'),
  ...require('./utils/flatten'),
  ...require('./utils/curry'),
  ...require('./utils/compose-pipe'),
  ...require('./utils/lazy'),

  // Puzzles
  ...require('./puzzles/algorithms'),
};
