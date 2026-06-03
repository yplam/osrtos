---
title: esp-microsleep
summary: A high-precision delay component for ESP-IDF that provides microsecond granularity
  using the esp_timer subsystem. It allows FreeRTOS tasks to sleep for sub-millisecond
  durations without busy-waiting, utilizing task notifications for efficient scheduling.
slug: esp-microsleep
codeUrl: https://github.com/mickeyl/esp-microsleep
siteUrl: https://www.vanille.de
version: 1.0.3
lastUpdated: '2025-05-04'
licenses:
- MIT
rtos: freertos
topics:
- esp32-idf
- freertos
isShow: false
createdAt: '2026-05-07T00:39:58+00:00'
updatedAt: '2026-05-07T00:39:58+00:00'
relatedProjects:
- lptim-tick-freertos-tickless-idle-via-stm32-lptim
- mbed-rpi-pico-timerinterrupt
- esp32-8048s050c-with-lvgl-9-4-and-freertos
- littlefs-for-esp-idf
- lwip-ptp-precision-time-protocol-for-lwip
- rx8900-high-precision-rtc-driver-for-rt-thread
---

In the world of embedded development with ESP32 and ESP-IDF, timing is often everything. While FreeRTOS provides the standard `vTaskDelay` function, it is inherently tied to the system tick rate. For many applications, this tick rate is set to 100Hz or 1000Hz, meaning the finest delay you can achieve is 10ms or 1ms respectively. When you need to wait for a specific sensor response or time a protocol signal in the microsecond range, `vTaskDelay` simply isn't granular enough.

Developers often resort to busy waiting using functions like `esp_rom_delay_us()`. However, busy waiting is inefficient; it consumes CPU cycles that could be used by other tasks and, if held too long, can trigger the FreeRTOS task watchdog, leading to system resets. `esp-microsleep` provides a more elegant solution by bridging the gap between inefficient busy-waiting and coarse-grained FreeRTOS delays.

### Achieving Sub-Tick Precision

`esp-microsleep` is a specialized ESP-IDF component designed to allow tasks to enter a blocked state for precise microsecond intervals. By leveraging the underlying `esp_timer` subsystem, it provides a mechanism to yield the CPU while waiting for very short durations.

The magic happens through FreeRTOS task notifications. When a task calls for a microsecond delay, the component schedules a high-resolution hardware timer. Instead of spinning in a loop, the calling task immediately enters a suspended state using `xTaskNotifyWait`. Once the timer expires, its Interrupt Service Routine (ISR) sends a notification back to the task, waking it up to resume execution. This ensures that the CPU can handle other background tasks or idle during the wait period.

### Calibration and Accuracy

In high-precision timing, every CPU cycle counts. There is an inherent overhead involved in setting up a hardware timer, context switching into a blocked state, and then switching back once the ISR triggers. To ensure the requested delay is as accurate as possible, `esp-microsleep` includes a calibration mechanism.

By calling `esp_microsleep_calibrate()`, the system computes the overhead specific to the current CPU frequency and environment. This compensation value is then subtracted from future delay requests, ensuring that the actual time spent "asleep" matches the requested duration as closely as possible.

### Integration and Configuration

Integrating the component into an ESP-IDF project is straightforward via the IDF component manager. However, because it relies on task notifications and specific ISR dispatch methods, a few configuration changes are required in the project's Kconfig.

Specifically, the project must enable `CONFIG_ESP_TIMER_SUPPORTS_ISR_DISPATCH_METHOD` to allow the timer to wake the task directly from the interrupt context. Additionally, the component uses Thread Local Storage (TLS) to keep track of its internal state per task, requiring `CONFIG_FREERTOS_THREAD_LOCAL_STORAGE_POINTERS` to be configured appropriately.

### Usage Example

The API is designed to be a drop-in logic replacement for standard delays. After a one-time calibration, delays can be called anywhere in your task code:

```c
// Include the header file.
#include <esp_microsleep.h>

// Calibrate the compensation value (for more accurate sleep times).
esp_microsleep_calibrate();

// Call to delay the currently running task for 400 µs.
esp_microsleep_delay(400);
```

This approach provides a much-needed tool for ESP32 developers working on timing-sensitive applications like custom bit-banging protocols, sensor interfacing, or power-efficient polling, all without sacrificing the multitasking benefits of FreeRTOS.
