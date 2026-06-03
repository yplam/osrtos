---
title: Common Tools for Mongoose-OS
summary: A collection of utility functions and base functionality designed for use
  with the Mongoose-OS framework. It provides common C and JavaScript APIs to simplify
  development across various Mongoose-OS projects.
codeUrl: https://github.com/mamuesp-libs/common-tools
isShow: false
rtos: mongoose-os
libraries: []
topics:
- mongoose-os
- toolbox
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- mongoose-os-app-skeleton
- mongoose-os-relay-library
- mjs-polyfill-for-mongoose-os
- mongoose-os-programs-and-examples
- mongoose-os-docker-image
- mongoose-os-samples-for-esp32
---

## Streamlining Mongoose-OS Development with Common Tools

When working with Mongoose-OS, developers often find themselves rewriting the same utility functions across different projects. Whether it is string manipulation, hardware abstractions, or general helper routines, having a centralized library can significantly speed up the development cycle. The `common-tools` repository by `mamuesp-libs` aims to solve this by providing a collection of base functionality that is frequently required in embedded applications.

### A Bridge Between C and JavaScript

One of the standout features of Mongoose-OS is its ability to run JavaScript (mJS) alongside C code. This library embraces that architecture by providing both C headers and JavaScript API bindings. This ensures that regardless of whether you are writing low-level drivers or high-level application logic, the same set of tools is available to you.

The project structure includes:
- **C Implementation**: Found in `src/mgos_common_tools.c` and `include/mgos_common_tools.h`.
- **JavaScript API**: Located in `mjs_fs/api_common.js`, allowing for seamless calls from the mJS environment.

### Integration and Architecture

The project is structured as a standard Mongoose-OS library. The presence of a `mos.yml` file allows it to be easily integrated into any Mongoose-OS project. By including this library as a dependency in your own `mos.yml`, the Mongoose-OS build tool (mos) automatically handles the compilation and linking of the C source and the inclusion of the JavaScript filesystem components.

### Why Use It?

While the project maintains a minimalist philosophy, its value lies in reducing boilerplate. In the world of embedded systems, where code size and efficiency are paramount, having a vetted collection of common tools helps maintain a clean codebase and reduces the likelihood of bugs in repetitive logic. It serves as a foundational layer for developers who want to focus on their specific application logic rather than reinventing basic utility functions.

If you are building a project on Mongoose-OS and find yourself copying snippets from one project to another, `common-tools` is designed to be the library that keeps your workspace organized and efficient.
