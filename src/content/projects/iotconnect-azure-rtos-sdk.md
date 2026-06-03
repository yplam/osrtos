---
title: IoTConnect Azure RTOS SDK
summary: A C-based SDK and sample collection for connecting embedded devices to Avnet's
  IoTConnect platform using Azure RTOS. It supports a wide range of hardware including
  STM32, NXP i.MX RT, Microchip SAM E54/WFI32, and Renesas RX65N microcontrollers.
slug: iotconnect-azure-rtos-sdk
codeUrl: https://github.com/avnet-iotconnect/iotc-azurertos-sdk
star: 7
version: v1.1.2
lastUpdated: '2025-04-08'
rtos: threadx-rtos
libraries:
- filex
topics:
- azure
- azure-rtos
- ck-rx65n
- iot
- iotconnect
- iotconnect-sdk
- mchp
- mimxrt1060
- netxduo
- nxp
- same54
- stm32
- stm32l4
- stm32u5
- threadx
- wfi32
- wfi32iot-board
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- x-cube-azrtos-l4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-g4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-h7-azure-rtos-software-expansion
- x-cube-azrtos-wl-azure-rtos-software-expansion-for-stm32wl
- x-cube-azrtos-l5-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-wb-azure-rtos-software-expansion-for-stm32cube
---

The IoTConnect Azure RTOS SDK is a specialized development kit designed to facilitate the integration of embedded devices with Avnet’s IoTConnect cloud platform. By leveraging the industrial-grade capabilities of Microsoft Azure RTOS (formerly ThreadX), this SDK provides a robust foundation for building secure, scalable, and efficient IoT applications across a diverse range of hardware architectures.

### Multi-Platform Hardware Support
One of the standout features of this SDK is its extensive support for popular development boards and microcontrollers. It includes pre-configured samples and build instructions for a variety of ecosystems:
- **STMicroelectronics**: STM32L4+ and STM32U5 IoT Discovery Kits.
- **NXP**: MaaxBoard RT and MIMXRT1060 EVK.
- **Microchip**: SAM E54 Xplained Pro and the WFI32-IoT (EV36W50A) board.
- **Renesas**: CK-RX65N Cloud Kit and the original RX65N Cloud Kit.

This broad support ensures that developers can evaluate IoTConnect on their preferred silicon while benefiting from a consistent API and middleware stack.

### Secure Connectivity and Authentication
Security is a core pillar of the SDK. It supports multiple authentication methods to suit different production requirements, including X.509 Mutual Authentication and Symmetric Key support. For boards like the WFI32-IoT, the SDK integrates with the built-in ATECC608 secure element to handle device identity and cryptographic operations securely. The documentation provides detailed guides on generating self-signed certificates and using ECC or RSA keys depending on the hardware's processing capabilities.

### Integrated Middleware and Libraries
The project is structured to work seamlessly with the Azure RTOS ecosystem. It utilizes submodules such as `iotc-c-lib` for core IoTConnect logic, `cJSON` for data parsing, and `libTO` for security operations. For boards like the WFI32-IoT, the SDK implements a user-friendly configuration system where the device appears as a Mass Storage Device (MSD) on a PC. Users can simply edit `CLOUD.CFG` and `WIFI.CFG` files to provision the device without needing to recompile the entire firmware.

### Development Environment
The SDK is designed to be used with the native IDEs provided by silicon vendors, ensuring a familiar workflow for embedded engineers:
- **STM32CubeIDE** for ST boards.
- **MCUXpresso IDE** for NXP targets.
- **MPLAB X IDE** for Microchip devices.
- **e2 Studio** for Renesas RX microcontrollers.

A `setup-project.sh` script is provided to automate the initial repository configuration, making it easier to manage dependencies and submodules across different operating systems, including Windows via WSL or MSYS2.

### Advanced Features and IoT Capabilities
Beyond basic telemetry, the SDK includes samples for advanced IoT scenarios. The STM32L4 and WFI32-IoT samples demonstrate how to interface with various sensors (such as Click Boards) and transmit environmental data to the cloud. Additionally, support for Over-the-Air (OTA) updates is highlighted for platforms like the SAM E54, enabling remote firmware management and long-term device maintenance. The SDK serves as a bridge between high-performance embedded hardware and cloud-based device management, providing the necessary tools to move from prototype to production-ready IoT solutions.
