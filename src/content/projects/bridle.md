---
title: Bridle
summary: Bridle is a comprehensive application framework built on top of the Zephyr
  RTOS, providing a suite of drivers, board extensions, and reference implementations
  for embedded systems development. It simplifies the process of building connected,
  low-power products by offering a curated set of components for various microcontrollers
  and hardware shields.
codeUrl: https://github.com/tiacsys/bridle
siteUrl: https://bridle.tiac-systems.net/
isShow: false
rtos: zephyr
libraries: []
topics:
- doc-zephyr
- iot
- kconfig
- microcontroller
- operating-system
- real-time
- realtime
- realtime-framework
- rtos
- setup-zephyr
- zephyr
- zephyr-documentation
- zephyr-rtos
- zephyr-source
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- zephyr-rtos-ai-harness
- ameba-rtos-sdk
- esp8266-rtos-software-development-kit-sdk
- infuse-iot-sdk
- stm32-framework
- breeze
---

Bridle is an open-source application framework designed to streamline the development of embedded systems using the Zephyr Real-Time Operating System (RTOS). Developed by TiaC Systems, Bridle acts as the "bridle and kite line" that helps developers steer the power of Zephyr (the "kite") toward specific hardware targets and application use cases. It is particularly focused on connected low-power products and safety-critical environments.

### A Framework for Zephyr Development

Rather than being a standalone operating system, Bridle is designed to be integrated into the Zephyr ecosystem. It provides a structured way to manage board extensions, custom drivers, and application samples that might not yet be part of the upstream Zephyr project. The project utilizes Zephyr's powerful CMake and Kconfig build systems to inject its own logic, such as versioning headers and custom driver subdirectories, into the build process.

### Extensive Hardware Support

One of Bridle's strongest assets is its wide range of supported hardware. It includes board extensions for popular platforms such as:

*   **Raspberry Pi**: Support for the Pico and Pico W (RP2040/RP2350).
*   **STMicroelectronics**: Extensions for various Nucleo boards (F3, F4, F7, G0, L4 series).
*   **NXP**: Support for i.MX RT1010 and RT1060 Evaluation Kits.
*   **Seeed Studio**: Support for the Seeeduino Xiao (SAMD21) and Lotus series.
*   **Arduino**: Extensions for the Arduino Zero.

Beyond just the base boards, Bridle provides extensive support for hardware shields. This includes the Grove system, various Waveshare LCDs, and specific Raspberry Pi Pico add-ons like the 10DOF IMU sensor and various clock/LED shields. This makes it an excellent choice for rapid prototyping where off-the-shelf modules are frequently used.

### Custom Drivers and Subsystems

Bridle includes a dedicated `drivers/` directory that implements support for various device classes. These are organized by functionality, including:

*   **Display**: Drivers for various screen modules.
*   **Sensors**: Support for environmental and motion sensors.
*   **MFD (Multi-Function Devices)**: Drivers for complex chips that handle multiple tasks.
*   **Serial & I2C**: Enhanced communication interface support.

These drivers are integrated into the Zephyr driver model, allowing developers to use standard Zephyr APIs to interact with hardware supported by Bridle.

### Getting Started and Community

Bridle is structured to be easy to adopt for those already familiar with the Zephyr workflow. It includes a `devcontainer` setup for VS Code, ensuring a consistent development environment across different machines. The project also maintains a robust CI/CD pipeline via GitHub Actions, covering compliance checks, documentation builds, and integration testing on various hardware targets.

As an open-source project, Bridle encourages community contributions. Whether it's adding support for a new board, fixing a bug in a driver, or providing a new application sample, the project provides clear templates and guidelines for contributors to help grow the ecosystem.
