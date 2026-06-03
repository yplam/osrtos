---
title: pubsub-c
summary: A lightweight C library implementing the Publish/Subscribe paradigm for real-time
  data streaming between decoupled components. It supports multiple data types, sticky
  messages, and priority queues, with built-in synchronization backends for Linux
  and FreeRTOS.
slug: pubsub-c
codeUrl: https://github.com/jaracil/pubsub-c
star: 81
lastUpdated: '2021-09-09'
rtos: freertos
topics:
- actor-model
- freertos
- message-bus
- pthreads
- pubsub
- pubsub-library
- threading
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- ppool-for-rt-thread
- libwebsockets
- flexiblebutton
- embeddedmqttbroker
- embedmcp-embedded-mcp-server-library
- coremqtt-agent-library
---

## Overview

pubsub-c is a lightweight C library designed to facilitate real-time data streaming between decoupled components using a Publish/Subscribe paradigm. By utilizing string-based topics separated by dots (e.g., `system.status.ready`), it allows different modules within an application to communicate without direct dependencies. This architecture is particularly beneficial in embedded systems where modularity and real-time responsiveness are critical.

## Core Concepts and Data Types

The library allows instances to publish data to specific topics. For example, a temperature sensor module might publish values to `<instance_name>.evt.temp`. Other modules, such as a display driver or a data logger, can subscribe to this topic to receive updates. This decoupling allows developers to add or remove features—like Bluetooth streaming or local storage—without modifying the original sensor logic.

pubsub-c supports a wide range of data types for message passing, including:
- Integers and Doubles
- Booleans
- Strings and Byte Arrays
- Pointers
- Error types and Nil values

## Advanced Messaging Features

Beyond basic message passing, pubsub-c includes several advanced features tailored for robust application development:

### Sticky Messages
Using the `FL_STICKY` flag, a publisher can ensure that the last sent message on a topic is retained. Any new subscriber connecting after the message was sent will immediately receive the most recent value. This is ideal for status flags, such as a "thread ready" signal, where the current state is more important than the history of transitions.

### Request/Response Pattern
Some topics can be configured to expect a response. A component can publish a command to a topic and provide a specific response topic. The receiving component processes the request and publishes the result (or an error) back to the provided response topic, enabling synchronous-like behavior over an asynchronous bus.

## Portability and Backends

One of the strengths of pubsub-c is its portability. It provides configurable backends for different operating environments:

- **Synchronization**: The library includes built-in support for Linux (using standard POSIX primitives) and FreeRTOS. Users can also implement custom synchronization mechanisms using the `-DPS_SYNC_CUSTOM` flag.
- **Queue Implementations**: Developers can choose between a standard Linked List queue (which is simple but lacks priority support) and a Bucket Queue implementation that supports message priorities.

## Usage Example

Initializing the library and setting up communication between threads is straightforward. Below is a simplified example of a main thread waiting for a worker thread to become ready:

```c
// Main thread initialization
int main(void) {
    ps_init();

    pthread_t thread;
    pthread_create(&thread, NULL, subscriber_thread, NULL);

    // Subscribe to the ready signal
    ps_subscriber_t *sub = ps_new_subscriber(10, STRLIST("thread.ready"));
    ps_msg_t *msg = ps_get(sub, 5000);
    
    if (msg != NULL && IS_BOOL(msg) && msg->bool_val == true) {
        printf("Thread is ready!\n");
    }
    ps_unref_msg(msg);
}

// Worker thread signaling readiness
static void *subscriber_thread(void *v) {
    ps_subscriber_t *s = ps_new_subscriber(10, STRLIST("main.evt"));
    // Signal ready using a sticky message
    PUB_BOOL_FL("thread.ready", true, FL_STICKY);
    
    // Process messages...
    return NULL;
}
```

## Technical Flexibility

The library is designed to be integrated into various build systems. It uses preprocessor definitions to select backends at compile-time, such as `-DPS_SYNC_FREERTOS` for embedded targets or `-DPS_SYNC_LINUX` for desktop testing and simulation. This makes it an excellent choice for projects that need to maintain a shared codebase between embedded hardware and high-level simulation environments.
