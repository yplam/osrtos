---
title: CMSIS Device Headers for STM32
summary: A comprehensive collection of CMSIS device headers for the entire STM32 microcontroller
  family, maintained by the modm-io project. These headers are sourced from official
  STM32Cube libraries and normalized for cross-platform development by converting
  line endings to Unix style and removing trailing whitespace.
codeUrl: https://github.com/modm-io/cmsis-header-stm32
siteUrl: https://modm.io
isShow: false
rtos: cmsis
libraries:
- modm
topics:
- barebone
- cmsis
- header
- microcontroller
- stm32
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- cmsis-device-headers-for-microchip-sam
- cmsis-for-stm32-development
- single-stm32-header
- modm-devices-curated-microcontroller-device-data
- stm32-cmsis-libraries
- stm32f103-cmsis-libraries-and-projects
---

Developing for STM32 microcontrollers requires a solid foundation of register definitions and hardware abstraction. While STMicroelectronics provides these through their STM32Cube libraries, the raw files often come with Windows-style line endings and inconsistent whitespace, which can be a nuisance for developers using modern Git-based workflows or Unix-like environments. The **modm-io/cmsis-header-stm32** repository solves this by providing a clean, automated mirror of the official CMSIS device headers.

### What are CMSIS Device Headers?
The Cortex Microcontroller Software Interface Standard (CMSIS) is a vendor-independent hardware abstraction layer for Arm Cortex-M based processors. The device headers included in this project provide the specific register definitions, bitmask constants, and interrupt vector tables for every variant of the STM32 family. Whether you are working on a low-power STM32L0 or a high-performance STM32H7, these files are the essential link between your C/C++ code and the silicon.

### Comprehensive Family Support
This repository is remarkably thorough, covering virtually every STM32 series released to date. The structure includes dedicated directories for:
- **Mainstream Series**: STM32F0, F1, F2, F3, F4, F7
- **Ultra-low-power Series**: STM32L0, L1, L4, L5, U0, U5
- **High-Performance Series**: STM32H5, H7, H7RS
- **Wireless Series**: STM32WB, WBA, WL, WL3
- **Entry-level & Specialized**: STM32C0, G0, G4, N6

Each folder contains the standard `Include` directory with the specific device header (e.g., `stm32f407xx.h`), the family-wide header (`stm32f4xx.h`), and the system configuration file (`system_stm32f4xx.h`).

### The modm-io Enhancement
The primary value of this repository, beyond simple hosting, is the normalization process. The modm-io team applies specific transformations to the original ST files:
1. **Line Ending Conversion**: All files are converted from Windows (CRLF) to Unix (LF) style.
2. **Whitespace Cleanup**: Trailing whitespace is removed to ensure clean diffs in version control.
3. **Automated Updates**: The repository is updated periodically via GitHub Actions, ensuring that the latest versions from STMicroelectronics (some as recent as late 2025) are always available.

### Integration and Usage
These headers are designed to be used as a submodule or a dependency in embedded build systems. Because they follow the standard CMSIS structure, they are drop-in replacements for the headers found in the STM32Cube SDKs. 

For example, to use these in a standard C project, you would define your specific device macro and include the family header:

```c
#define STM32F407xx
#include "stm32f4xx.h"

int main(void) {
    // Access registers directly using CMSIS definitions
    RCC->AHB1ENR |= RCC_AHB1ENR_GPIODEN;
    GPIOD->MODER |= GPIO_MODER_MODER12_0;
    
    while(1) {
        GPIOD->ODR ^= GPIO_ODR_OD12;
    }
}
```

By providing a centralized, clean, and versioned source for these critical files, the modm-io project simplifies the infrastructure of STM32 development, allowing engineers to focus on their application code rather than fighting with SDK file formatting.
