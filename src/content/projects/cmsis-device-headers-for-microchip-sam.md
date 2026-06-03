---
title: CMSIS Device Headers for Microchip SAM
summary: A collection of CMSIS-compliant device header files for Microchip SAM microcontrollers,
  including SAMD21, SAMD51, and SAME51 families. These headers are sourced from official
  Microchip device packs and processed for better compatibility with Unix-based development
  environments.
codeUrl: https://github.com/modm-io/cmsis-header-sam
siteUrl: http://packs.download.atmel.com/
isShow: false
rtos: cmsis
libraries:
- modm
topics:
- barebone
- cmsis
- header
- microchip-sam
- microcontroller
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- cmsis-device-headers-for-stm32
- microchip-cmsis-modules-for-arduino
- cmsis-for-stm32-development
- single-stm32-header
- modm-devices-curated-microcontroller-device-data
- development-utils
---

Developing for Microchip SAM microcontrollers requires a solid foundation of register definitions and hardware abstraction. The **cmsis-header-sam** repository provides the essential CMSIS (Cortex Microcontroller Software Interface Standard) device headers for the Microchip SAM family, ensuring that developers have access to standardized, reliable, and clean header files for their embedded projects.

### Standardized Headers for SAM Devices

This project serves as a curated mirror of the device packs provided by Microchip. While the original files are distributed via Atmel's pack server, they often come with Windows-style line endings and inconsistent whitespace. This repository cleans up those files by converting all line endings to Unix style and removing trailing whitespace, making them much more friendly for modern version control systems and cross-platform development environments.

### Extensive Device Support

The repository covers a wide range of Microchip SAM families, from ultra-low-power M0+ devices to high-performance M7 cores. Supported families include:

*   **SAMD21**: Popular for entry-level 32-bit applications (v1.3.395).
*   **SAMD51 & SAME51**: High-performance Cortex-M4F devices (v1.2.139 and v1.1.139).
*   **SAME53 & SAME54**: Advanced connectivity and Ethernet-enabled MCUs.
*   **SAML21**: Ultra-low power consumption specialists.
*   **SAMG**: Optimized for sensor hub applications.
*   **SAM E70/S70/V70/V71**: High-end Cortex-M7 devices for automotive and industrial use.

### Repository Structure

Each device family is organized into a specific directory (e.g., `samd21a`, `samd51a`). Inside these directories, you will find a standard CMSIS structure:

*   **include/**: The main header files.
*   **include/component/**: Bitfield definitions for every peripheral.
*   **include/instance/**: Base address definitions for peripheral instances.
*   **include/pio/**: Pin multiplexing and I/O definitions.
*   **sam.h**: The top-level header that includes the specific device header based on your compiler definitions.

### How to Use

To use these headers in your project, you typically include the top-level `sam.h` file. You must define the specific part number (e.g., `__SAMD21G18A__`) in your compiler's preprocessor settings so that the header correctly identifies your target hardware.

```c
#include <sam.h>

int main(void) {
    /* The headers provide access to peripheral structures */
    PORT->Group[0].DIRSET.reg = PORT_PA17;
    
    while (1) {
        PORT->Group[0].OUTTGL.reg = PORT_PA17;
        for (int i = 0; i < 100000; i++) { __asm("nop"); }
    }
}
```

### Integration with modm

This repository is maintained by the **modm-io** organization. While these headers can be used standalone in any C/C++ project, they are designed to integrate seamlessly with the `modm` library ecosystem, providing the low-level register access required for higher-level hardware abstraction layers (HALs).

### Licensing

The Microchip header files are provided under the **Apache-2.0 License**, which is permissive and suitable for both open-source and commercial applications. This ensures that developers can integrate these headers into their firmware without restrictive licensing concerns.
