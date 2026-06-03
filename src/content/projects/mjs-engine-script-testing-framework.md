---
title: mJS Engine Script Testing Framework
summary: A testing framework for the mJS engine designed for Mongoose OS. It provides
  a structured environment to validate JavaScript scripts on embedded devices, supporting
  additional libraries like mjs-array and mjs-math.
slug: mjs-engine-script-testing-framework
codeUrl: https://github.com/Dietatko/mjs-testing
star: 1
lastUpdated: '2019-09-22'
rtos: mongoose-os
topics:
- javascript
- js
- mjs-engine
- mjs-engine-library
- mongoose-os
- mongoose-os-library
- testing
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- mjs-polyfill-for-mongoose-os
- mjs-math-object-polyfill
- mjs-array-prototype-polyfill
- max17263-test-app-for-mongoose-os
- mongoose-os-relay-library
- common-tools-for-mongoose-os
---

## Overview

The mJS engine script testing framework is a specialized utility designed for developers working within the Mongoose OS ecosystem. As JavaScript (via the mJS engine) is frequently used to implement high-level logic and cloud interactions in Mongoose OS applications, having a dedicated framework to test these scripts is essential for maintaining firmware reliability.

This project is structured as a Mongoose OS library, making it easy to integrate into existing embedded projects. It specifically targets the mJS engine, which is a lightweight, restricted implementation of JavaScript tailored for microcontrollers with limited resources.

## Key Features

The framework provides the infrastructure necessary to execute and validate JavaScript code within the constraints of an embedded environment. Its primary role is to ensure that the logic written in JS behaves as expected before it is deployed to production devices.

**Key aspects include:**
- **Mongoose OS Integration:** Built specifically for the `mos` build system and runtime.
- **Library Support:** Includes dependencies for `mjs-array` and `mjs-math`, ensuring that scripts using advanced data structures or mathematical functions can be tested accurately.
- **Filesystem Management:** Utilizes the standard Mongoose OS filesystem (`fs` directory) to manage test scripts and assets.

## Technical Implementation

The framework is defined as a library (`type: lib`) in its `mos.yml` manifest. It is designed to be version-synced with the Mongoose OS core, ensuring compatibility across different releases of the RTOS. By leveraging the modular nature of Mongoose OS, the testing framework can be included during the development and QA phases of a project and omitted from the final production build if necessary to save space.

It relies on the following core components:
- **mjs core:** The base JavaScript engine for Mongoose OS.
- **mjs-array:** Provides extended array manipulation capabilities within the JS environment.
- **mjs-math:** Provides standard mathematical functions that are often required for sensor data processing.

## Getting Started

To use this framework, developers add it to their project's `mos.yml` file under the `libs` section. Once included, the framework allows for the execution of test suites that exercise the JavaScript logic residing in the device's filesystem. This is particularly valuable for IoT applications where complex business logic is often abstracted into scripts to allow for easier updates and modifications without full firmware recompilation.
