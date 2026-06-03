---
title: Arduino-Pico
summary: A high-performance Arduino core for Raspberry Pi RP2040 and RP2350 microcontrollers,
  supporting both ARM and RISC-V architectures. It integrates the Raspberry Pi Pico
  SDK with FreeRTOS SMP support and provides advanced features like multicore processing,
  PIO-based peripherals, and integrated SSL/TLS.
codeUrl: https://github.com/earlephilhower/arduino-pico
siteUrl: https://arduino-pico.readthedocs.io/en/latest/
isShow: false
rtos: freertos
libraries:
- littlefs
- lwip
topics:
- raspberry
- pi
- pico
- arduino
- arduino-pico
- rp2040
- freertos
- smp
- raspberry-pi
- picow
- ble
- bluetooth
- wifi
- a2dp
- pico2
- rp2350
- risc-v
- riscv
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- silicon-labs-arduino-core
- arduino-rt-thread-library
- raspberry-pi-pico-freertos-sample-application
- rp2040-freertos-template
- n-able-arduino-core
- micropython-for-kendryte-k210-lobo-port
---

The Raspberry Pi Pico and its successors, the RP2350 series, have redefined what developers expect from low-cost microcontrollers. While the official C/C++ SDK is powerful, many developers prefer the accessibility and vast ecosystem of the Arduino framework. **Arduino-Pico**, maintained by Earle Philhower, is the premier community-driven core that brings the full power of the RP2040 and RP2350 to the Arduino IDE.

### A Modern Core for Modern Silicon
Unlike some ports that merely wrap existing functions, Arduino-Pico is built on top of the bare Raspberry Pi Pico SDK and utilizes a custom GCC 14.3/Newlib 4.5 toolchain. This allows it to support the latest hardware features, including the ARM Cortex-M33 and Hazard3 RISC-V cores found in the RP2350. Whether you are using a standard Raspberry Pi Pico 2 or a specialized board from Adafruit, SparkFun, or Waveshare, this core provides a unified development experience.

### Key Technical Features
One of the standout aspects of this core is its deep integration with the unique hardware features of the Raspberry Pi silicon:

*   **Multicore Support:** Developers can easily utilize both cores of the processor by defining `setup1()` and `loop1()`, allowing for true parallel processing without complex threading code.
*   **FreeRTOS SMP:** For more complex applications, the core includes FreeRTOS with Symmetric Multiprocessing (SMP) support, enabling the RTOS to manage tasks across both cores automatically.
*   **PIO-Powered Peripherals:** The RP2040/RP2350 Programmable I/O (PIO) state machines are used to generate jitter-free signals for Servos, Tones, I2S audio, and Software UARTs, offloading the main CPU cores.
*   **Advanced Networking:** With support for the Pico W (WiFi/Bluetooth), ESP32-based hosts, and various Ethernet controllers (WizNet, ENC28J60), the core provides a robust networking stack including SSL/TLS via BearSSL.
*   **Filesystems and OTA:** Integrated support for LittleFS and SD cards allows for easy data logging, while Over-the-Air (OTA) update capabilities make it suitable for remote deployments.

### Broad Hardware Compatibility
The project supports an exhaustive list of boards, ranging from the original Pico and Pico W to the new Pico 2 and 2W. It also includes definitions for dozens of third-party boards like the Arduino Nano RP2040 Connect, Seeed XIAO RP2350, and various Challenger boards. For custom hardware, "Generic" profiles allow users to configure flash size and I/O pins manually.

### Getting Started
Installing the core is straightforward via the Arduino Boards Manager. Users simply need to add the following URL to their preferences:

```
https://github.com/earlephilhower/arduino-pico/releases/download/global/package_rp2040_index.json
```

Once installed, uploading sketches is as simple as clicking the upload button. The core includes an auto-reset tool that identifies the proper device to reset into bootloader mode, eliminating the need to manually toggle the BOOTSEL button after the initial flash.

### Community and Ecosystem
Arduino-Pico is more than just a core; it is a gateway to advanced embedded development. It supports GPROF profiling, semihosting for debugging, and even allows for overclocking or underclocking directly from the Arduino IDE menus. By bridging the gap between the ease of Arduino and the power of the Pico SDK, it has become the standard choice for professional and hobbyist RP2040/RP2350 projects alike.
