---
title: TCA9534 8-bit I/O Expander Driver for RT-Thread
summary: A driver package for the Texas Instruments TCA9534 8-bit I/O expander, built
  specifically for the RT-Thread device framework. It enables standard I/O device
  interface access for I2C-based GPIO expansion on embedded systems. The package supports
  pin mode configuration, polarity inversion, and standard read/write operations.
slug: tca9534-8-bit-i-o-expander-driver-for-rt-thread
codeUrl: https://github.com/Prry/rtt-tca9534
siteUrl: https://github.com/Prry/rtt-tca9534
star: 1
version: v1.0.0
lastUpdated: '2023-11-12'
rtos: rt-thread
topics:
- i2c
- rt-thread
- tca9534
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- tmp1075-temperature-sensor-driver-for-rt-thread
- vl53l0x-tof-sensor-driver-for-rt-thread
- bl602-gpio-expander-for-apache-nuttx
- hynitron-cst816s-touch-controller-driver-for-apache-nuttx
- sgp30-gas-sensor-driver-for-rt-thread
- sgm706-independent-watchdog-driver-for-rt-thread
---

The TCA9534 driver package is a specialized software component designed for the RT-Thread real-time operating system. It provides a seamless interface to the Texas Instruments TCA9534, a versatile I2C/SMBus to 8-bit I/O expander. This chip is widely used in applications where a processor's native GPIO pins are limited, such as in servers, routers, industrial automation, and personal electronics.

By leveraging the RT-Thread device framework, this package allows developers to interact with the TCA9534 using standard I/O device interfaces like `rt_device_open`, `rt_device_read`, `rt_device_write`, and `rt_device_control`. This abstraction simplifies the integration process, making the expander's pins behave much like native system resources.

### Key Features and Hardware Support
The TCA9534 chip itself offers several advantages, including low power consumption and a wide supply voltage range. The driver package supports the core capabilities of the hardware, including:
- Individual input/output settings for each of the 8 pins.
- Polarity inversion settings.
- Multiple device support (up to 8 devices on a single I2C bus via address pins).
- Standard polling mode for reliable data acquisition.

The package is designed to work with RT-Thread 3.0.0+ and requires the system's I2C driver framework to be enabled.

### Technical Integration
The package is structured to fit perfectly into the RT-Thread ecosystem. It includes a standard `SConscript` for the SCons build system and follows the typical directory structure including source, header, and example files. Integration is handled via the RT-Thread package manager, where users can enable the driver and optional sample code through `menuconfig`.

To use the package, developers first initialize the device by specifying the device name, the I2C bus name, and the I2C slave address:

```c
#include "tca9534.h"

static int rt_hw_tca9534_port(void)
{
    /* Initialize tca9534 on i2c1 with address 0x20 */
    return rt_tca9534_init("tca9534", "i2c1", 0x20);
}
INIT_DEVICE_EXPORT(rt_hw_tca9534_port);
```

### Accessing the Device
Once initialized, the device can be found and controlled using the standard RT-Thread API. For instance, configuring a pin as an output and setting its level is straightforward. This level of abstraction ensures that the application logic remains decoupled from the specific I2C transaction details, relying instead on the robust RT-Thread I2C driver framework.

```c
struct rt_tca9534_config cfg;
rt_device_t dev = rt_device_find("tca9534");

/* Set P0 to output mode, normal polarity */
cfg.pin = 0;
cfg.mode = RT_TCA953_MODE_OUTPUT;
cfg.polarity = RT_TCA953_POLARITY_NOR;
rt_device_control(dev, RT_TCA953_CTRL_MODE, (void*)&cfg);

/* Write high level to P0 */
rt_device_write(dev, 0, 1, 1);

/* Read input status from P1 */
rt_uint8_t read_val;
rt_device_read(dev, 1, &read_val, 1);
```

### Testing and Validation
The package includes MSH (Finsh) shell support, allowing developers to verify device registration using the `list_device` command. When the sample code is enabled, it provides real-time feedback on pin status, making it easy to debug hardware connections and logic levels during the development phase.
