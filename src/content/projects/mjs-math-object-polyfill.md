---
title: mJS Math Object Polyfill
summary: A partial implementation of the JavaScript Math and Number objects for the
  mJS engine. It provides essential mathematical constants and functions for resource-constrained
  microcontrollers running Mongoose OS.
slug: mjs-math-object-polyfill
codeUrl: https://github.com/Dietatko/mjs-math
star: 1
lastUpdated: '2019-09-22'
rtos: mongoose-os
topics:
- javascript
- js
- math
- mjs-engine
- mjs-engine-library
- mongoose-os
- mongoose-os-library
- polyfill
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- mjs-array-prototype-polyfill
- mjs-polyfill-for-mongoose-os
- mjs-engine-script-testing-framework
- rtt-math-mathematics-library-for-rt-thread
- mongoose-os-relay-library
- lis3dh-accelerometer-library-for-mongoose-os
---

## Overview

The mJS engine is a restricted JavaScript implementation specifically designed for microcontrollers with limited resources. To maintain a minimal library footprint, mJS does not include the standard JavaScript `Math` object out of the box. The `mjs-math` library provides a partial polyfill to restore these essential mathematical properties and methods to the mJS environment.

This project is particularly useful for developers working with Mongoose OS who need to perform calculations involving trigonometry, logarithms, or standard mathematical constants without manually implementing them in C or restricted JS.

## Key Features

The library implements a curated selection of the standard ECMAScript Math and Number specifications, focusing on the most commonly used features in embedded applications:

- **Mathematical Constants**: Includes `Math.PI`, `Math.E`, `Math.LN10`, `Math.LN2`, `Math.LOG10E`, `Math.LOG2E`, `Math.SQRT1_2`, and `Math.SQRT2`.
- **Core Functions**: Provides `Math.abs`, `Math.exp`, `Math.log`, `Math.log10`, `Math.log2`, and `Math.pow`.
- **Number Object Extensions**: Adds `Number.EPSILON`, `Number.NaN`, `Number.isNaN`, `Number.isFinite`, and infinity constants (`Number.POSITIVE_INFINITY`, `Number.NEGATIVE_INFINITY`).

## Technical Implementation

Because mJS is designed for environments where every byte of RAM and Flash counts, the library is optimized for a small footprint. The project includes a build script that uses `uglify-es` to mangle and compress the source code before it is placed in the device's filesystem (`fs/`).

## Integration and Usage

Integrating the library into a Mongoose OS project is straightforward. Developers add the repository as a library dependency in their `mos.yml` file:

```yaml
libs:
  - origin: https://github.com/mongoose-os-libs/mjs
  - origin: https://github.com/Dietatko/mjs-math
```

Once the project is built and flashed, the math functions can be accessed in JavaScript by loading the library at the start of the script:

```javascript
load("mjs_math.js");

// Example: Calculate the area of a circle
let radius = 5;
let area = Math.PI * Math.pow(radius, 2);
print("Area:", area);

// Example: Check for finite numbers
if (Number.isFinite(area)) {
  print("Calculation successful");
}
```

## Footprint Considerations

At present, the library includes all supported functions in a single file. While this provides a comprehensive set of tools, the author notes that there is currently no option to include only specific functions to further reduce storage requirements. However, the use of minification ensures that the impact on the system remains as low as possible for the functionality provided.
