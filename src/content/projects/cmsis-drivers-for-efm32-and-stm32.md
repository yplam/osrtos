---
title: CMSIS Drivers for EFM32 and STM32
summary: A library providing CMSIS-compliant hardware abstraction drivers for Silicon
  Labs EFM32 and STMicroelectronics STM32 microcontrollers. It currently implements
  USART and I2C interfaces, enabling portable code development across different hardware
  vendors using the standard ARM CMSIS-Driver API.
codeUrl: https://github.com/mariusmm/CMSIS_Drivers
siteUrl: https://arm-software.github.io/CMSIS_5/Driver/html/index.html
isShow: false
rtos: cmsis
libraries: []
topics:
- arm
- cmsis
- cmsis-drivers
- driver-i2c
- driver-usart
- drivers
- efm32
- modbus
- modbus-client
- modbus-rtu
- stm32
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- stm32-cmsis-libraries
- stm32-prototyping-libraries
- cmsis-for-stm32-development
- stm32f103-cmsis-libraries-and-projects
- stm32cube-cmsis-core
- pamculib
---

The CMSIS-Driver specification is a software API that provides a generic peripheral interface for middleware and application code. By standardizing the way we interact with microcontrollers, ARM allows developers to write code that is significantly more portable across different silicon vendors. The **CMSIS_Drivers** project by Mariusmm provides a concrete implementation of these interfaces for two popular MCU families: Silicon Labs EFM32 and STMicroelectronics STM32.

### Bridging the Gap Between Vendors

One of the biggest challenges in embedded development is the fragmentation of hardware abstraction layers (HALs). Moving a project from an STM32 to an EFM32 usually requires rewriting significant portions of the peripheral initialization and data handling code. This project addresses that by implementing the standard CMSIS Driver interfaces. 

Currently, the repository focuses on two critical communication protocols:
- **Driver_USART**: Universal Synchronous/Asynchronous Receiver/Transmitter.
- **Driver_I2C**: Inter-Integrated Circuit bus.

Future updates are planned to include support for SPI, Flash, and Storage drivers, further expanding the utility of the library.

### Hardware Support and Requirements

Because these drivers sit on top of vendor-specific libraries, there are some prerequisites for each platform:

*   **EFM32 (Silicon Labs)**: This implementation utilizes the `emlib` library. Before using the drivers, developers must ensure the clock tree is properly configured for the target hardware. The project includes `EFM32/CMSIS_Driver_Test_UART.c` as a reference for this setup.
*   **STM32 (STMicroelectronics)**: This implementation relies on the STM32 HAL. Similar to the EFM32, clock configuration must be handled by the user, typically via the examples provided in `STM32/CMSIS_Driver_Test_USART.c`.

### Practical Example: A Vendor-Independent Modbus Client

To demonstrate the power of standardized drivers, the project includes a MODBUS client implementation (`Examples/modbus_client.c`). Because this client is written against the CMSIS UART driver API rather than a specific vendor HAL, the same logic works on both EFM32 and STM32 without modification. 

Specific wrappers for each vendor—`modbus_efm32.c` and `modbus_stm32.c`—show how to instantiate the client on the respective hardware. This architecture serves as a blueprint for building portable embedded middleware.

### Getting Started

Integrating the drivers into your project is straightforward. You can import the specific vendor folder (`EFM32/CMSIS_Driver/` or `STM32/CMSIS_Driver/`) into your IDE. For those using Eclipse-based environments like Simplicity Studio or STM32CubeIDE, you can set up a virtual folder pointing to the repository directory.

Note that while the implementation files (`.c`) are provided in this repository, the standard header files must be obtained from the official [ARM CMSIS_5 repository](https://github.com/ARM-software/CMSIS_5). This ensures that you are always working against the latest standardized definitions provided by ARM.
