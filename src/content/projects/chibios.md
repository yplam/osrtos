---
title: ChibiOS
summary: ChibiOS is a complete development environment for embedded applications,
  featuring the RT and NIL real-time kernels along with a comprehensive Hardware Abstraction
  Layer (HAL). It provides a scalable architecture for microcontrollers ranging from
  tiny 8-bit AVRs to high-performance ARM Cortex-M7 and SPC5 devices.
codeUrl: https://github.com/tickelton/chibios
siteUrl: http://www.chibios.org
isShow: false
rtos: chibios-rt
libraries:
- lwip
topics:
- chibios
- chibios-rt
- chibios-rtos
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- chibios-rt-examples-for-stm32f401re-nucleo
- arduino-rt-thread-library
- nuclei-software-development-kit-nuclei-sdk
- nuttx-real-time-operating-system
- stm32cubeh7rs-mcu-firmware-package
- eclipse-threadx-usbx
---

ChibiOS is a name synonymous with efficiency and reliability in the embedded world. It isn't just a single RTOS; it is a modular ecosystem designed to scale from the smallest 8-bit microcontrollers to the most powerful 32-bit processors. Whether you are building a simple sensor node or a complex industrial controller, ChibiOS provides the building blocks necessary for robust real-time performance.

### The Three Pillars of ChibiOS
At its core, the project is divided into several distinct components that allow developers to choose the right level of complexity for their application:

1. **ChibiOS/RT**: This is the flagship high-performance RTOS. It features a fast preemptive scheduler, support for multiple priority levels, and a rich set of synchronization primitives like semaphores, mutexes (with priority inheritance), and mailboxes. It is designed for applications where performance and feature richness are paramount.
2. **ChibiOS/NIL**: For developers working with extremely limited RAM and Flash, NIL provides a "micro" kernel. It offers a subset of RT's features but with a significantly smaller footprint, making it ideal for devices like the ATtiny or low-end STM32s where every byte counts.
3. **ChibiOS/HAL**: The Hardware Abstraction Layer is perhaps one of ChibiOS's strongest features. It provides a consistent API for peripherals like GPIO, UART, SPI, I2C, and USB across different hardware platforms. This allows developers to write portable application code that can be moved between different MCU families with minimal changes.

### Broad Hardware Support
ChibiOS is famous for its deep integration with the STM32 family, but its reach extends much further. The repository includes support for a wide variety of architectures and boards:
- **STMicroelectronics**: Extensive support for STM32 F0, F1, F2, F3, F4, F7, G0, G4, H7, L0, L1, L4, and the newer WB55 series.
- **NXP/ST**: Support for SPC56 series PowerPC microcontrollers, commonly used in automotive applications.
- **Atmel/Microchip**: Support for classic 8-bit AVR devices, including popular Arduino boards like the Uno, Mega, and Leonardo.
- **Analog Devices**: Support for the ADuCM360 family.

### Recent Innovations and Features
The project continues to evolve rapidly, as seen in its recent change logs. Key additions include the integration of the RT7 kernel, which brings improved performance and new API capabilities. There is also a significant focus on modern hardware features, such as MACv2 driver support for the STM32H7xx and SIO (Synchronous I/O) implementations for USARTs with and without FIFOs. 

Security and modern standards are also addressed with the inclusion of stand-alone ports for ARMv8-M (including TrustZone support) and updated middleware like FatFS 0.14 and improved lwIP bindings that support memory pools for better deterministic behavior.

### Project Structure
Navigating the ChibiOS repository is straightforward once you understand the layout:
- `os/`: Contains the core components, including the RT and NIL kernels, the HAL, and common abstraction layers like CMSIS-OS and NASA OSAL.
- `demos/`: A massive collection of ready-to-run examples for dozens of boards, serving as the best starting point for new users.
- `testhal/` & `testrt/`: Comprehensive integration tests that ensure the stability of the HAL and Kernel across different platforms.
- `ext/`: Placeholders for external libraries that integrate with the OS, such as networking stacks or file systems.

### Getting Started
Because ChibiOS includes a full HAL and RTOS, starting a project usually involves selecting a demo that matches your hardware and using it as a template. The build system is based on Makefiles, which are designed to be easily integrated into IDEs like ChibiStudio or used directly from the command line.

For example, a simple thread definition in ChibiOS/RT looks like this:

```c
static THD_WORKING_AREA(waThread1, 128);
static THD_FUNCTION(Thread1, arg) {
  (void)arg;
  chRegSetThreadName("blinker");
  while (true) {
    palToggleLine(LINE_LED_GREEN);
    chThdSleepMilliseconds(500);
  }
}

int main(void) {
  halInit();
  chSysInit();
  
  // Starting the blinker thread
  chThdCreateStatic(waThread1, sizeof(waThread1), NORMALPRIO, Thread1, NULL);

  while (true) {
    chThdSleepMilliseconds(1000);
  }
}
```

This snippet demonstrates the clean separation between hardware initialization (`halInit`) and kernel initialization (`chSysInit`), as well as the intuitive threading API that makes ChibiOS a favorite among embedded developers.
