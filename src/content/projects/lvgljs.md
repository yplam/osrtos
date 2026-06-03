---
title: lvgljs
summary: A framework for developing LVGL user interfaces using JavaScript and React's
  virtual DOM concept. It leverages the QuickJS engine and libuv to provide a modern,
  declarative web-development experience for embedded devices and simulators.
slug: lvgljs
codeUrl: https://github.com/lvgl/lv_binding_js
star: 209
lastUpdated: '2025-11-10'
rtos: ''
libraries:
- lvgl
topics:
- c
- gui
- javascript
- lvgl
- mcu
- react
- reactjs
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-emscripten-port
- luavgl
- lvglpp-a-c-wrapper-for-lvgl
- lvgl-c-binding
- lvgl-port-for-m5stack-core2
- lv-modern-c-20-bindings-for-lvgl
---

## The Power of React for Embedded UIs

lvgljs is a powerful bridge between the modern web development ecosystem and the world of embedded graphics. By bringing React's virtual DOM concept to [LVGL](https://github.com/lvgl/lvgl), it allows developers to manipulate UI components using a familiar, declarative syntax. This approach significantly lowers the barrier to entry for creating complex, high-performance user interfaces on resource-constrained hardware.

## Technical Architecture

At its core, lvgljs is built upon a robust stack of open-source technologies. It utilizes [txiki.js](https://github.com/saghul/txiki.js), a tiny JavaScript runtime that combines the [QuickJS](https://github.com/quickjs-ng/quickjs/) engine with [libuv](https://github.com/libuv/libuv) for platform abstraction. This setup provides a lightweight yet capable environment for executing JavaScript on embedded targets. 

The project uses a custom React reconciler to map React components directly to native LVGL objects. This means that when you update your state in JavaScript, the framework efficiently calculates the differences and applies only the necessary changes to the underlying LVGL widgets.

## Key Features and Capabilities

lvgljs aims to provide a comprehensive feature set that mirrors the capabilities of the native LVGL library while adding the convenience of web-like styling and layout:

- **Full Component Support**: It supports all built-in LVGL components, including Views, Images, Buttons, Textareas, Switches, and more complex widgets like Calendars and Charts.
- **Modern Layouts**: Full support for LVGL's flex and grid styles, allowing for responsive designs similar to HTML5 CSS.
- **CSS-like Styling**: Styles can be written in a format familiar to web developers, covering boxing models, colors, fonts, opacity, shadows, and transitions.
- **Dynamic Assets**: Support for dynamic image loading and full integration with LVGL's animation system.
- **JSAPI Extensions**: Built-in APIs for networking (via curl), filesystem access, and dimension management.

## Cross-Platform Development

The project is designed with a "simulator-first" workflow. Developers can build and test their UIs on a desktop environment using SDL2 before deploying to actual hardware. The build system, managed via CMake and npm, supports both simulator and device targets. 

For the JavaScript side, the project uses `esbuild` and `webpack` to bundle JSX and TypeScript code into a single JS bundle that the embedded runtime can execute. This allows developers to use modern JavaScript features and libraries while targeting microcontrollers or MPUs.

## Getting Started

Developing with lvgljs feels very much like writing a standard React application. You define components, manage state, and use hooks to handle side effects. The framework handles the translation of these high-level abstractions into optimized LVGL calls. Detailed documentation is provided for each component, covering properties, styles, and event handling, ensuring that developers can leverage the full power of LVGL through a modern interface.
