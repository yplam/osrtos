---
title: mJS Array Prototype Polyfill
summary: A library providing a partial polyfill for the JavaScript Array prototype
  in the mJS engine. It enables standard array methods like map, filter, and reduce
  on microcontrollers running Mongoose OS. The library is designed to maintain a small
  footprint for resource-constrained environments.
slug: mjs-array-prototype-polyfill
codeUrl: https://github.com/Dietatko/mjs-array
star: 2
lastUpdated: '2019-09-17'
rtos: mongoose-os
topics:
- array
- javascript
- js
- mjs-engine
- mjs-engine-library
- mongoose-os
- mongoose-os-library
- polyfill
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- mjs-math-object-polyfill
- mjs-polyfill-for-mongoose-os
- mjs-engine-script-testing-framework
- lis3dh-accelerometer-library-for-mongoose-os
- arduino-ir-for-mongoose-os
- mongoose-os-relay-library
---

mJS is a lightweight JavaScript engine specifically tailored for microcontrollers with very limited resources. To keep the library footprint as small as possible, the standard JavaScript Array prototype is not included by default. The `mjs-array` project addresses this by providing a partial polyfill that adds essential utility functions to array instances.

Because mJS array instances do not share a single prototype object, this library requires each array to be initialized separately. This is typically handled using the `Array.create()` method provided by the library. Once initialized, arrays gain access to familiar functional programming methods found in standard JavaScript environments.

### Supported Array Methods

The library implements a selection of the most commonly used Array prototype methods, including:

- **Array.from()**: Creates a new array instance from an array-like or iterable object.
- **every()**: Tests whether all elements in the array pass the provided test.
- **filter()**: Creates a new array with all elements that pass the test.
- **find() and findIndex()**: Returns the value or index of the first element that satisfies the testing function.
- **forEach()**: Executes a provided function once for each array element.
- **map()**: Creates a new array populated with the results of calling a provided function on every element.
- **reduce()**: Executes a reducer function on each element, resulting in a single output value.
- **some()**: Tests whether at least one element in the array passes the test.

### Integration and Usage

For developers using Mongoose OS, the library can be integrated by adding it to the `mos.yml` configuration file. Once loaded into the JavaScript environment via `load("mjs_array.js")`, developers can start using the enhanced array capabilities. Arrays returned from these utility functions are automatically initialized, allowing for method chaining.

```javascript
load("mjs_array.js");

// Initialize an array to gain prototype methods
var numbers = Array.create([1, 2, 3, 4]);

// Chain methods together
var result = numbers
   .map(function(x) { return x * 2; })
   .filter(function(x) { return x > 5; });
```

### Design Considerations

The primary goal of this polyfill is to balance functionality with the strict memory constraints of embedded systems. Not all standard Array methods are included, as each additional function increases the storage and memory footprint. This selective implementation ensures that developers can use powerful array manipulation patterns without overwhelming the limited resources of hardware like the ESP32 or ESP8266. Currently, the library provides the full set of functions as a single package to simplify deployment on Mongoose OS devices.
