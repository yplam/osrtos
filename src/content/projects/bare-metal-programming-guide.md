---
title: Bare Metal Programming Guide
summary: A comprehensive educational resource for learning microcontroller programming
  from scratch using GCC and datasheets without high-level frameworks. It covers fundamental
  concepts like memory mapping, register manipulation, startup code, and peripheral
  drivers for various ARM Cortex-M and RISC-V architectures.
codeUrl: https://github.com/cpq/bare-metal-programming-guide
isShow: false
rtos: ''
libraries:
- littlefs
topics:
- arm
- baremetal
- cmsis
- embedded-web-server
- embedded-webserver
- ethernet
- gcc
- gpio
- irq
- make
- stm32
- tutorial
- uart
- webserver
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- embedded-systems-bare-metal-programming-ground-up
- learning-stm32
- stm32-cmsis-zero-to-hero
- h-c-l-p-tr-nh-stm32f1
- stm32f1xx-bare-metal-template
- arm-kl25z-mbed-ide-example-programs
---

The Bare Metal Programming Guide is a deep dive into the world of embedded systems for developers who want to move beyond the 'magic' of vendor-supplied HALs and IDEs. Created by Cesanta's Sergey Lyubka, this repository serves as both a tutorial and a set of production-ready templates for those who wish to program microcontrollers using nothing but a GCC compiler, a linker script, and a datasheet.

### The Philosophy of Bare Metal
Modern embedded development often relies on heavy frameworks like STM32Cube, Arduino, or Keil. While these tools accelerate development, they often obscure the underlying mechanics of the hardware. This guide strips away those layers to explain how the CPU actually interacts with memory and peripherals. It starts with the absolute minimum—a firmware that does nothing—and builds up to complex features like web servers and file systems.

### From Reset to Main
One of the most valuable aspects of this guide is its explanation of the boot process. It walks through the creation of a vector table and the `_reset()` handler, which is the first code executed by the MCU. You learn how to initialize the stack pointer, copy the `.data` section from Flash to RAM, and zero out the `.bss` section before calling `main()`.

```c
// A typical minimal startup routine
__attribute__((naked, noreturn)) void _reset(void) {
  extern long _sbss, _ebss, _sdata, _edata, _sidata;
  for (long *dst = &_sbss; dst < &_ebss; dst++) *dst = 0;
  for (long *dst = &_sdata, *src = &_sidata; dst < &_edata;) *dst++ = *src++;

  main();
  for (;;) (void) 0; // Infinite loop if main returns
}
```

### Understanding Peripherals via Registers
The guide teaches a structured way to interact with hardware registers using C structures. Instead of using cryptic hex addresses directly, it demonstrates how to map structures to peripheral memory regions, making the code both readable and efficient. For example, configuring a GPIO pin becomes a matter of bit manipulation within a structured `gpio` pointer.

```c
struct gpio {
  volatile uint32_t MODER, OTYPER, OSPEEDR, PUPDR, IDR, ODR, BSRR, LCKR, AFR[2];
};
#define GPIOA ((struct gpio *) 0x40020000)

static inline void gpio_set_mode(struct gpio *gpio, uint8_t pin, uint8_t mode) {
  gpio->MODER &= ~(3U << (pin * 2));
  gpio->MODER |= (mode & 3) << (pin * 2);
}
```

### Progressive Learning Steps
The repository is organized into sequential steps, each introducing a new concept:
- **Step 0-2**: Minimal boot, Blinky, and SysTick interrupts for accurate timing.
- **Step 3-4**: UART communication and redirecting `printf()` to serial output (IO retargeting).
- **Step 5-6**: Integrating CMSIS headers and configuring system clocks for maximum performance.
- **Step 7**: Implementing a full web server using the Mongoose library.

### Broad Hardware Support
While the primary tutorial uses the **STM32 Nucleo-F429ZI**, the repository provides templates for a wide variety of popular hardware, including:
- **STMicroelectronics**: Nucleo-F303, L432, and H563.
- **Raspberry Pi**: RP2040 (Pico-W5500).
- **Espressif**: ESP32-C3 (RISC-V).
- **Microchip**: SAME54 Xplained.
- **Texas Instruments**: EK-TM4C1294XL.

### Advanced Templates
Beyond the basics, the guide includes advanced templates for real-world applications. The **lfs** template demonstrates how to integrate the **littlefs** file system to store data in built-in flash, while the **cli** template provides a command-line interface over UART for real-time device interaction. For those looking to build modern interfaces, the **webui** template integrates a professional dashboard using the Mongoose networking library.
