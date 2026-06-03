---
title: Hynitron CST816S Touch Controller Driver for Apache NuttX
summary: A specialized device driver for the Hynitron CST816S touch controller, integrated
  with the Apache NuttX RTOS. It provides support for I2C-based touch data retrieval
  and GPIO interrupt handling, primarily targeting the PineDio Stack BL604 and other
  RISC-V or ESP32 platforms.
codeUrl: https://github.com/lupyuen/cst816s-nuttx
siteUrl: https://lupyuen.github.io/articles/touch
isShow: false
rtos: nuttx
libraries:
- lvgl
topics:
- bl602
- bl604
- cst816s
- i2c
- nuttx
- pinecone
- pinedio
- riscv32
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- bl602-gpio-expander-for-apache-nuttx
- apache-nuttx-driver-for-bosch-bme280-sensor
- pinephone-usb-driver-for-apache-nuttx-rtos
- rust-i2c-driver-for-bosch-bme280-on-apache-nuttx
- st7789-and-lvgl-demo-for-apache-nuttx-rtos
- pinedio-stack-bl604-on-apache-nuttx-rtos
---

The Hynitron CST816S is a popular touch controller found in various embedded devices, including the PineDio Stack BL604 and the PineTime smartwatch. This repository provides a dedicated driver for the CST816S, specifically tailored for the Apache NuttX RTOS. By integrating this driver, developers can enable touch capabilities on RISC-V and ESP32-based hardware using standard NuttX input device interfaces.

## Driver Architecture and Implementation

The driver is structured as a standard NuttX character device driver located under the input device subsystem. It communicates with the CST816S via the I2C bus and utilizes a GPIO interrupt line to detect touch events. Because the CST816S is a "peculiar" I2C device—often requiring a screen tap to wake up before it responds to an I2C scan—the driver is designed to handle these power-management nuances.

One of the core components of the driver is the `cst816s_get_touch_data` function, which reads raw data from the controller's registers. It interprets touch coordinates (X and Y), touch events (Down, Up, or Contact), and unique touch IDs. To ensure reliability, the driver includes logic to patch invalid coordinates during "Touch Up" events by returning the last known valid position.

## Integration and Configuration

Adding the driver to a NuttX project involves adding the repository as a git submodule and creating symbolic links within the NuttX source tree. Once linked, the driver must be enabled via `menuconfig` under `Device Drivers → Input Device Support`. 

For hardware like the BL602 or BL604, the driver requires specific bring-up code to initialize the I2C bus and attach the interrupt handler. The project utilizes a `bl602_expander` to manage GPIO interrupts, as the standard BL602 GPIO driver may have limitations in certain interrupt configurations.

```c
/* Example registration in board bring-up */
#define CST816S_DEVICE_ADDRESS 0x15
#include <nuttx/input/cst816s.h>

struct i2c_master_s *i2c_bus = bl602_i2cbus_initialize(0);
ret = cst816s_register("/dev/input0", i2c_bus, CST816S_DEVICE_ADDRESS);
```

## Technical Challenges and Workarounds

Developing this driver revealed several interesting hardware and timing quirks. A notable issue involves I2C logging; in some configurations, the driver fails to return valid touch data unless I2C warnings are enabled. This suggests a potential race condition or timing issue within the underlying I2C transfer logic. The current workaround involves forcing an `i2cwarn()` call within the `bl602_i2c_transfer` function to ensure stable data retrieval.

Additionally, the driver handles coordinate mapping for rotated displays. In tests with the LVGL graphics library, it was noted that the touch coordinates might appear sideways depending on the ST7789 display orientation, requiring calibration or software-side rotation.

## Testing and Performance

The driver has been successfully tested with the `lvgltest` application on Apache NuttX. While functional, there is ongoing work to reduce perceived lag. Future improvements include:
- Increasing SPI frequency for the display to match the touch response.
- Implementing SPI DMA to offload the CPU.
- Moving interrupt handlers to a more centralized GPIO expander.

This driver provides a critical bridge for developers looking to build interactive, touch-enabled applications on the PineDio Stack or similar hardware using the robust Apache NuttX ecosystem.
