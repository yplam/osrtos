---
title: BL602 GPIO Expander for Apache NuttX
summary: A specialized GPIO expander driver for BL602 and BL604 microcontrollers running
  the Apache NuttX RTOS. It simplifies development by mapping physical pins directly
  to standard GPIO device paths and provides robust interrupt demultiplexing and pin-reuse
  validation.
codeUrl: https://github.com/lupyuen/bl602_expander
siteUrl: https://lupyuen.github.io/articles/expander
isShow: false
rtos: nuttx
libraries:
- lvgl
topics:
- bl602
- bl604
- gpio
- nuttx
- pinecone
- pinedio
- riscv32
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- hynitron-cst816s-touch-controller-driver-for-apache-nuttx
- pinedio-stack-bl604-on-apache-nuttx-rtos
- rust-embedded-hal-for-apache-nuttx-rtos
- bl602-adc-and-temperature-sensor-library-for-apache-nuttx
- tca9534-8-bit-i-o-expander-driver-for-rt-thread
- gpio-device-driver-for-beaglebone-black
---

Developing for the PineDio Stack BL604 on Apache NuttX RTOS presents a unique challenge: managing a high density of GPIOs. The standard NuttX GPIO driver for the BL602 architecture often maps pins in a way that can be confusing for developers—for instance, `/dev/gpio0` might actually map to physical Pin 10. The **BL602 Expander** project solves this by providing a dedicated GPIO Expander driver that maps GPIOs 0 through 22 directly to `/dev/gpio0` through `/dev/gpio22`.

## Why a GPIO Expander?

On many microcontrollers, GPIO naming conventions in the OS don't match the physical hardware, leading to friction during driver development. For the BL604, which utilizes all 23 available GPIOs, this complexity is magnified. The BL602 Expander acts as an I/O Expander driver within the NuttX ecosystem, implementing the standard `ioexpander_ops_s` interface. This allows developers to interact with pins using a predictable 1:1 mapping while leveraging the standard NuttX GPIO Lower Half driver.

Beyond simple naming, the expander addresses a critical hardware limitation: GPIO interrupts on the BL602 are multiplexed into a single IRQ (`BL602_IRQ_GPIO_INT0`). The expander handles the heavy lifting of demultiplexing this interrupt, allowing multiple drivers—such as touch panels, push buttons, and LoRa transceivers—to share the interrupt line seamlessly.

## Key Features and Capabilities

- **Direct Mapping**: Maps physical GPIO Pin N to `/dev/gpioN` for intuitive development.
- **Interrupt Management**: Provides a robust framework for attaching and detaching GPIO interrupt handlers, specifically tested with the CST816S touch panel and SX1262 LoRa transceiver.
- **Safety Validation**: At startup, the driver verifies that GPIO, SPI, I2C, and UART pins do not overlap. If a pin is defined for SPI but also requested as a standard GPIO, the driver will trigger an assertion failure to prevent hardware conflicts.
- **Standardized Operations**: Implements `direction`, `option`, `writepin`, and `readpin` operations, calling the underlying `bl602_configgpio`, `bl602_gpioread`, and `bl602_gpiowrite` functions.

## Technical Implementation

The driver is structured as a standard NuttX I/O Expander. When initialized in the board's `bringup` logic, it registers the pins and sets up the interrupt status monitoring. 

```c
static const struct ioexpander_ops_s g_bl602_expander_ops =
{
  bl602_expander_direction,
  bl602_expander_option,
  bl602_expander_writepin,
  bl602_expander_readpin,
  bl602_expander_readbuf,
#ifdef CONFIG_IOEXPANDER_INT_ENABLE
  bl602_expander_attach,
  bl602_expander_detach
#endif
};
```

One of the most useful aspects for developers is the `bl602_expander_option` function, which allows configuring interrupt triggers (Rising Edge vs. Falling Edge) via standard `IOEXP_SETOPTION` calls. This makes it significantly easier to integrate user-space applications or other kernel drivers that require specific interrupt behaviors.

## Hardware Support

While primarily tested on the **PineDio Stack BL604**, this driver is compatible with any BL602-based board running Apache NuttX. It is particularly useful for boards with high pin utilization where the standard GPIO driver's sequential naming becomes a bottleneck for clarity.

## Getting Started

To integrate the expander into a NuttX project, it is typically added as a submodule within the `drivers/ioexpander` directory. After linking the header and source files, the driver must be enabled in `menuconfig` under:
`Device Drivers -> IO Expander/GPIO Support -> Enable IO Expander Support`.

In the board-specific `bl602_bringup.c`, the expander is initialized by passing arrays of input, output, and interrupt pins. This centralized configuration ensures that the system has a complete view of pin assignments before other drivers (like the LCD or Touch Panel) attempt to claim them.
