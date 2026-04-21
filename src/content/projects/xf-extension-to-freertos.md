---
title: 'xf: eXtension to FreeRTOS'
summary: xf is a modern C++ library designed to extend FreeRTOS with more ergonomic,
  convenient, and safer APIs. It utilizes standard C++ features such as std::chrono
  and std::optional to reduce boilerplate and improve type safety without departing
  from FreeRTOS's original design patterns. The library is currently optimized for
  ESP-IDF and ESP32 microcontrollers but maintains portability for other platforms.
slug: xf-extension-to-freertos
codeUrl: https://github.com/iniw/xf
version: 0.3.0
lastUpdated: '2025-09-25'
licenses:
- BSD-2-Clause
rtos: freertos
topics:
- cpp
- esp-idf
- esp32
- freertos
isShow: false
createdAt: '2026-04-21T05:18:54+00:00'
updatedAt: '2026-04-21T05:18:54+00:00'
---

FreeRTOS is the industry standard for real-time operating systems in the embedded world, but its C-based API often requires significant boilerplate and manual management of opaque pointers and macros. The `xf` library (short for eXtension to FreeRTOS) addresses these challenges by providing a modern C++ wrapper that emphasizes safety, ergonomics, and developer speed while honoring the original design choices of FreeRTOS.

### Modernizing the FreeRTOS Experience

The primary goal of `xf` is to eliminate the friction often associated with FreeRTOS's "mildly object-oriented" C patterns. In standard FreeRTOS, developers frequently deal with manual tick conversions and complex macro ceremonies. `xf` replaces these with a thinner, more intuitive C++ API. By utilizing modern features like templates and type traits, the library reduces the amount of code required to implement basic RTOS features, allowing developers to focus on actual features rather than kernel ceremonies.

One of the most significant improvements is the tight integration with the C++ Standard Library. Instead of calculating ticks manually or using vendor-specific macros, `xf` utilizes `std::chrono` for time management. This allows developers to specify timeouts using standard units like `std::chrono::milliseconds` or `std::chrono::seconds`, making the code much easier to read and reason about. 

### Safety and Expressiveness

Safety is a core pillar of the `xf` design. The library uses modern C++ attributes like `[[nodiscard]]` to ensure that critical return values—such as whether a queue send operation succeeded—are not accidentally ignored. It also leverages `std::optional` and other standard types to provide a more expressive API than raw C pointers, which are often prone to null-pointer errors.

Despite these modern additions, `xf` avoids unnecessary complexity. The function signatures remain minimal and readable, ensuring that even developers who are not experts in the latest C++ standards can understand the codebase. The library aims to be a "no-brainer" alternative: if a FreeRTOS class has an `xf` equivalent, the `xf` version is designed to be strictly better in terms of safety and ease of use while remaining familiar to anyone who knows the original API.

### Core Components and Architecture

The library covers a wide range of FreeRTOS primitives, including:

*   **Tasks and Notifications**: Includes specialized support for Binary and Counting notifications, with specific implementations for Interrupt Service Routines (ISRs).
*   **Queues and Semaphores**: Modernized wrappers that handle data safely and provide clear, time-aware interfaces.
*   **Timers**: Simplified timer management that integrates with the C++ type system.

Documentation is provided directly within the code, making it easy to cross-reference with the official FreeRTOS documentation. For instance, the `send` method for queues is explicitly mapped to `xQueueSend`, ensuring that experienced FreeRTOS developers can transition quickly.

### Integration and Usage

While `xf` is designed to be portable, it has been primarily tested within the ESP-IDF build system, making it an excellent choice for ESP32 developers. It can be integrated into a project by placing it in the `components/` directory or by using CMake's `FetchContent` module to pin a specific release version. 

Here is an example of what the `xf` API looks like in practice:

```cpp
/// Waits up to `timeout` amount of time for the item to be pushed to the back of the queue 
/// and returns whether it successfully did so.
/// Analogous to xQueueSend.
template<typename Rep, typename Period>
[[nodiscard]] bool send(const Item&, std::chrono::duration<Rep, Period> timeout);
```

By providing a consistently improved experience across different RTOS features, `xf` ensures that the steps taken to improve a queue also apply to semaphores and tasks, resulting in a cohesive and predictable development environment for embedded C++ projects.
