import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone'); // load this early!

// because this bundle will load first, configure browser environment
// for production or development here

if (process.env.ENV === 'production') {
  // Production
} else {
  // Development and test
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
