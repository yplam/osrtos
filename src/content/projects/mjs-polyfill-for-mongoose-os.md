---
title: mjs-polyfill for Mongoose OS
summary: A standardization polyfill for Mongoose OS projects using the mJS JavaScript
  engine. It implements common Node.js and browser APIs such as timers, module exports,
  and console logging for embedded applications, specifically tested on ESP8266 hardware.
slug: mjs-polyfill-for-mongoose-os
codeUrl: https://github.com/Asondo/mjs-polyfill
star: 2
lastUpdated: '2019-07-12'
rtos: mongoose-os
topics:
- esp32
- esp8266
- example
- mjslibrary
- mongoose-os
- nodejs
- polyfill
- require
- setinterval
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- mjs-array-prototype-polyfill
- mjs-math-object-polyfill
- mjs-engine-script-testing-framework
- mongoose-os-relay-library
- mongoose-os-programs-and-examples
- common-tools-for-mongoose-os
---

## Overview

mjs-polyfill is a utility project designed to enhance the development experience on Mongoose OS by providing a standardization layer for its JavaScript engine, mJS. While mJS is a powerful, low-footprint engine designed for microcontrollers, it lacks some of the standard global functions and module systems that web and Node.js developers are accustomed to. This project bridges that gap by implementing familiar APIs, making it easier to port code and organize complex embedded applications.

## Key Features

The polyfill focuses on three main areas of standardization: timing functions, module management, and logging.

### Standard Timers
In standard Mongoose OS development, developers often interact with the underlying C-based timer APIs. This polyfill introduces the standard web-style timing functions:
- `setTimeout` and `clearTimeout` for delayed execution.
- `setInterval` and `clearInterval` for repeating tasks.

These functions allow developers to write timing logic that looks and behaves exactly like standard JavaScript, simplifying the transition for those coming from a web background.

### Node.js-like Module System
One of the most significant additions is a simplified version of the CommonJS module system. By providing `require()` and `module.exports`, the polyfill allows developers to break their code into logical files and manage dependencies more effectively. This is a major improvement over the default behavior of loading scripts into a single global namespace.

### Console Logging
The project adds a `console` object with a `log` method, providing a familiar interface for debugging and outputting information to the system logs.

## Technical Implementation

The project is designed to be lightweight and easy to integrate. It is primarily tested on the ESP8266 platform but is compatible with any hardware supported by Mongoose OS. The core logic resides in a `polyfill.js` file which is loaded at the start of the application.

### Integration
To use the polyfill, developers simply need to include the `polyfill.js` file in their project's filesystem and load it at the very top of their `init.js` entry point:

```javascript
load('polyfill.js');
```

Once loaded, standard patterns can be used throughout the application. For example, creating a module is as simple as:

```javascript
// sensor.js
module.exports = {
    read: function() { /* ... */ }
};

// init.js
let sensor = require('sensor.js');
setInterval(function() {
    console.log('Reading:', sensor.read());
}, 5000);
```

## Dependencies and Configuration

The project utilizes the standard Mongoose OS build system, defined in `mos.yml`. It relies on several core Mongoose OS libraries to function, including:
- `mjs`: The core JavaScript engine.
- `rpc-service-fs`: For filesystem interactions.
- `wifi`: For connectivity on supported hardware like the ESP8266.

By providing these abstractions, mjs-polyfill allows embedded developers to focus on application logic using familiar patterns while still benefiting from the performance and efficiency of Mongoose OS.
