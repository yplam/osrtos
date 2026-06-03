---
title: Supranim Emitter
summary: A lightweight, framework-agnostic event emitter library for the Nim programming
  language. It provides a simple API for subscribing to and emitting events, facilitating
  decoupled communication within applications.
codeUrl: https://github.com/supranim/emitter
siteUrl: https://github.com/supranim/emitter
isShow: false
rtos: ''
libraries:
- nimble
topics:
- event-emitter
- event-listener
- events
- nim
- nim-lang
- nimble
- supranim
- supranim-package
star: 7
lastUpdated: '2024-04-11'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- pubsub-c
- nesper-nim-wrappers-for-esp-idf
- flexiblebutton
- stm32-event-triggered-finite-state-machine-framework
- bloom
- nimble-arduino
---

Supranim Emitter is a streamlined event management library designed for the Nim ecosystem. At its core, it provides a robust mechanism for implementing the observer pattern, allowing different parts of an application to communicate without being tightly coupled. Whether you are building a web service, a command-line tool, or a systems-level application, Supranim Emitter offers a clean way to handle asynchronous or decoupled logic.

### Key Features and Design Philosophy

The library is built with simplicity and performance in mind. One of its standout features is being entirely framework-agnostic; while it is a core component of the Supranim Framework, it can be dropped into any Nim project without bringing in heavy dependencies. This makes it an excellent choice for developers who prioritize small binary sizes and minimal overhead.

Key highlights include:
- **Dependency-free**: No external packages are required to run the emitter.
- **Framework Agnostic**: Works in any Nim environment.
- **Flexible Data Passing**: Listeners can receive data as `varargs[Arg]` objects, utilizing Nim's `std/typeinfo` for flexible type handling.
- **Open Source**: Released under the MIT license, encouraging community contribution and integration.

### Technical Implementation

The library leverages Nim's powerful type system to handle event arguments. By using the `Any` object from `std/typeinfo`, the emitter can pass various data types through events while maintaining a degree of type safety and flexibility. This is particularly useful in complex applications where event payloads might vary significantly between different modules.

### Getting Started with Supranim Emitter

Installation is straightforward via Nimble:

```bash
nimble install emitter
```

Once installed, you can begin defining listeners and emitting events immediately. The API is intuitive, focusing on `listen` and `emit` primitives.

#### Basic Usage Example

In a typical application, you might set up a listener for a specific event, such as a user updating their email address:

```nim
# Define a listener
Event.listen("account.email.changed") do(args: varargs[Arg]):
    echo "Email address has been changed."
    # Logic for sending confirmation emails or updating logs goes here

# Emit the event from elsewhere in your code
let newEmailAddress = "new.address@example.com"
Event.emit("account.email.changed", newArg(newEmailAddress))
```

### Integration with the Supranim Framework

For developers using the full Supranim Framework, the emitter follows a specific organizational pattern. It is recommended to store listeners within the `events/listeners` directory. By creating dedicated files for different logic branches (e.g., `account.nim` for account-related events), developers can maintain a clean and scalable codebase. In these scenarios, using `include` instead of `import` is recommended to load listeners into the main application state.

### Conclusion

Supranim Emitter is a versatile tool for Nim developers looking to implement event-driven architectures. Its lack of dependencies and straightforward API make it a reliable choice for both small scripts and large-scale framework-based applications. As part of the Supranim ecosystem, it continues to evolve with a focus on performance and developer experience.
