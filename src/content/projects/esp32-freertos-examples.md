---
title: ESP32 FreeRTOS Examples
summary: A comprehensive collection of firmware examples for the ESP32 microcontroller
  using the ESP-IDF framework and FreeRTOS. It demonstrates core RTOS primitives like
  task management, semaphores, and queues, alongside hardware-specific implementations
  for I2C, SPI, and WiFi connectivity.
codeUrl: https://github.com/DiegoPaezA/ESP32-freeRTOS
siteUrl: https://www.mrdpaez.com
isShow: false
rtos: freertos
libraries: []
topics:
- ble
- esp32
- freertos
- freertos-iot
- iot
- mqtt
star: 497
lastUpdated: '2024-04-02'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- esp32-repo
- mongoose-os-samples-for-esp32
- unipg-mbed-os-samples
- freertos-coremqtt-agent-demos
- super-mini-esp32-c3-arduino-and-platformio-sketches
- raspberry-pi-pico-freertos-sample-application
---

The ESP32 has established itself as a powerhouse in the IoT and embedded systems landscape, largely due to its dual-core Xtensa LX6 microprocessor and integrated wireless capabilities. However, to truly unlock its potential, developers often turn to FreeRTOS, the real-time operating system integrated into the ESP-IDF (Espressif IoT Development Framework). The **ESP32-freeRTOS** repository by Diego Paez serves as a structured educational resource, providing a wide array of examples that bridge the gap between theoretical RTOS concepts and practical hardware implementation.

### Mastering RTOS Primitives

At the heart of this repository is a focus on the fundamental building blocks of multitasking. The examples are categorized to help developers understand how to manage shared resources and synchronize execution across the ESP32's cores. Key areas covered include:

*   **Task Management:** From basic 'Blink' examples using tasks to more complex multi-core task testing and task notifications for lightweight signaling.
*   **Synchronization Mechanisms:** Detailed implementations of Binary Semaphores, Mutexes (to prevent resource contention), and Counting Semaphores.
*   **Inter-Task Communication:** Practical use of Queues (cxColas) to send data between different tasks, ensuring thread-safe data handling.
*   **Event Groups:** Demonstrations on how to synchronize multiple tasks simultaneously based on specific event bits.

### Hardware and Peripheral Integration

Beyond the kernel-level concepts, the project provides a wealth of drivers and interface examples for common embedded peripherals. This includes I2C scanning and the use of the PCA9548a I2C multiplexer, which is essential for projects requiring multiple sensors with conflicting addresses. 

For sensor enthusiasts, there are dedicated modules for the DHT temperature and humidity sensors and the MPU6050 accelerometer/gyroscope. The repository also explores analog-to-digital conversion (ADC) and digital-to-analog conversion (DAC) via the SPI-based MCP4822.

### Connectivity and Networking

The ESP32's wireless features are well-represented, with examples ranging from basic WiFi station setup and network scanning to more advanced protocols. Developers can learn how to fetch data from the internet, synchronize time via NTP, and implement the MQTT protocol—a standard for IoT messaging.

### Getting Started

These examples are designed to be used with the ESP-IDF environment. Most projects follow a standard structure with a `main.c` and a `CMakeLists.txt` file. For instance, a typical task creation in these examples looks like this:

```c
void app_main(void)
{
    // Create a task to handle sensor readings
    xTaskCreate(vTaskReadSensor, "SensorTask", 2048, NULL, 5, NULL);
    
    // Create a task to handle WiFi telemetry
    xTaskCreate(vTaskTelemetry, "TelemetryTask", 4096, NULL, 4, NULL);
}
```

Whether you are a student learning the ropes of real-time systems or an engineer looking for a quick reference for ESP32 peripheral configuration, this repository offers a solid foundation for building robust, multitasking embedded applications.
