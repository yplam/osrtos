---
title: 'R2P2-ESP32: Ruby Rapid Portable Platform for ESP32'
summary: A project that ports the R2P2 (Ruby Rapid Portable Platform) to the ESP32
  series of microcontrollers using the ESP-IDF framework. It enables running PicoRuby
  on embedded hardware with support for automatic script execution and integrated
  file storage.
slug: r2p2-esp32-ruby-rapid-portable-platform-for-esp32
codeUrl: https://github.com/picoruby/R2P2-ESP32
star: 38
version: 0.2.2
lastUpdated: '2026-01-24'
rtos: freertos
libraries:
- lwip
topics:
- esp-idf
- esp32
- picoruby
- ruby
isShow: false
createdAt: '2026-01-26'
updatedAt: '2026-01-26'
relatedProjects:
- sqlite3-for-esp-idf
- micropython-for-esp32-with-psram-support-lobo-port
- esp32-u2f-security-key
- dual-boot-esp32-with-platformio-and-arduino
- klipper-esp32
- esp32-p4-jit-dynamic-code-loading-system
---

R2P2-ESP32 is an implementation of the Ruby Rapid Portable Platform (R2P2) specifically tailored for the ESP32 series of microcontrollers. By utilizing the `picoruby-esp32` component, this project allows developers to run PicoRuby—a lightweight version of the Ruby programming language—directly on Espressif hardware.

The project is built upon the ESP-IDF (Espressif IoT Development Framework), which provides the underlying FreeRTOS-based operating system and hardware abstraction layers. This integration allows Ruby scripts to interact with the ESP32's peripherals while maintaining the productivity and expressive syntax of the Ruby language.

### Key Features and Workflow

One of the core strengths of R2P2-ESP32 is its ease of use for script deployment. The system is designed to automatically execute files named `app.rb` or `app.mrb` located in the `/storage/home` directory upon startup. This "auto-run" capability makes it ideal for creating standalone IoT devices or embedded applications where the logic is defined in Ruby rather than C.

The project uses a custom partition table, as defined in `partitions.csv`, which allocates space for NVS (Non-Volatile Storage), factory firmware, and a dedicated 1MB FatFS partition for storage. This storage area is where users can place their Ruby scripts and data files, providing a persistent environment for application logic.

### Build and Deployment

The development workflow is managed through a combination of the ESP-IDF build system and Rake tasks. The project supports a wide range of modern ESP32 chips, including:
- **ESP32 (Classic)**
- **ESP32-S3**
- **ESP32-C3**
- **ESP32-C6**

Developers can initialize the environment for their specific chip using commands like `rake setup_esp32c3` and then build, flash, and monitor the device using simple Rake commands. Once flashed, the device provides a PicoRuby Shell (PRB) over the serial monitor, allowing for interactive development and real-time debugging.

### Technical Foundation

Under the hood, R2P2-ESP32 configures the ESP-IDF environment with specific settings for stack sizes and memory management to accommodate the Ruby interpreter. For instance, the main task stack size is increased to 8192 bytes, and FatFS is configured to use the heap for long filename support, ensuring that the Ruby environment has sufficient resources to operate reliably. The project also includes configuration for MbedTLS, enabling secure communication capabilities common in IoT applications.

### Future Directions

The project is actively looking for contributors to enhance its desktop integration. A key goal is to enable USB Mass Storage Class (MSC) support, which would allow users to manage files on the ESP32 via a simple drag-and-drop interface, similar to how many modern development boards like the Raspberry Pi Pico operate. This would further lower the barrier to entry for developers coming from a web or software background into the embedded space.
