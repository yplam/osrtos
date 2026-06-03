---
title: coreMQTT Agent Library
summary: The coreMQTT Agent library provides a thread-safe high-level API for the
  coreMQTT library, enabling multiple threads to share a single MQTT connection. It
  manages the MQTT connection by serializing access and handling the background process
  loop, simplifying MQTT integration in multi-threaded embedded systems like FreeRTOS.
codeUrl: https://github.com/FreeRTOS/coreMQTT-Agent
siteUrl: https://freertos.github.io/coreMQTT-Agent/main/index.html
isShow: false
rtos: freertos
libraries: []
topics:
- freertos
- iot
- mqtt
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- freertos-coremqtt-agent-demos
- embeddedmqttbroker
- bc28-mqtt-package-for-rt-thread
- ppool-for-rt-thread
- thing-simplified-mqtt-framework-for-esp8266-and-esp32
- freertos-mqtt-client-demo
---

Managing MQTT connections in a multi-threaded embedded environment can be complex. Developers often face challenges when multiple tasks need to publish messages or subscribe to topics simultaneously without corrupting the internal state of the MQTT stack. The **coreMQTT Agent library** is designed specifically to solve this problem by providing a thread-safe wrapper around the [coreMQTT](https://github.com/FreeRTOS/coreMQTT) library.

## Simplifying Multi-Threaded MQTT

The coreMQTT Agent acts as a manager for the MQTT connection. Instead of requiring every application task to interact directly with the coreMQTT API and manage the `MQTT_ProcessLoop`, tasks send commands to the Agent. The Agent then serializes these requests and handles the underlying MQTT operations in a single, dedicated task. This architecture significantly reduces implementation overhead and eliminates the need for complex mutex management at the application level.

### Key Features and Quality Standards

This library is built with high-reliability standards in mind, making it suitable for safety-critical or robust industrial applications:
- **Thread Safety**: Provides thread-safe equivalents to standard coreMQTT APIs.
- **Low Complexity**: No function has a GNU Complexity score over 8.
- **MISRA Compliance**: Checked against mandatory rules in the MISRA C:2012 coding standard.
- **Formal Verification**: Validated for memory safety through the CBMC automated reasoning tool and static analysis via Coverity.
- **Static Memory Support**: Can be configured to use entirely static memory allocation, which is a common requirement in deeply embedded systems.

## Technical Architecture: The Messaging Interface

To use the MQTT Agent on a specific platform, you must provide a thread-safe "messaging interface." This interface allows the application tasks to communicate with the Agent task. The interface consists of four primary function pointers:

| Function Pointer | Description |
| :--- | :--- |
| `MQTTAgentMessageSend_t` | Sends commands (as pointers) to the Agent's queue. |
| `MQTTAgentMessageRecv_t` | Used by the Agent to receive commands from the queue. |
| `MQTTAgentCommandGet_t` | Allocates a command structure (via `malloc` or a static pool). |
| `MQTTAgentCommandRelease_t` | Frees or returns a command structure to the pool. |

## Performance Tuning and Configuration

The library offers several configuration constants to tune performance based on your TCP stack's capabilities:

- **Agent Queue Block Time**: If your TCP stack is not event-driven, you can adjust `MQTT_AGENT_MAX_EVENT_QUEUE_WAIT_TIME` to make the Agent check the socket more frequently, improving responsiveness at the cost of higher CPU usage.
- **Socket Timeouts**: The library requires non-blocking sockets (timeout set to 0). If the socket were to block, it would prevent the Agent from processing outgoing requests from other tasks, leading to high latency.
- **Task Priority**: For optimal performance, the MQTT Agent task should have a higher priority than the tasks that use its services. This ensures that as soon as a task submits a request, the Agent can process it immediately.

## Getting Started

To include the coreMQTT Agent in your project, you should clone the repository with submodules to ensure the coreMQTT dependency is included:

```bash
git clone https://github.com/FreeRTOS/coreMQTT-Agent.git --recurse-submodules
```

If you are using CMake, the project provides a `mqttAgentFilePaths.cmake` file to simplify the inclusion of source files and header paths into your build system. For developers looking for reference implementations, the FreeRTOS ecosystem provides several demos, including a Windows Simulator example that demonstrates multi-tasking MQTT operations.

## Testing and Validation

The project includes a robust suite of unit tests using the CMock framework. These tests can be built using CMake and a C90-compliant compiler. Additionally, the `test/cbmc/proofs` directory contains formal verification proofs that ensure the library's memory safety under various conditions, providing a level of confidence far beyond standard functional testing.
