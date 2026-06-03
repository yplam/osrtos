---
title: GP2Y10 Dust Sensor Driver for RT-Thread
summary: A driver package for Sharp GP2Y10 series optical dust sensors, including
  GP2Y1010AU0F and GP2Y1014AU0F, specifically designed for the RT-Thread RTOS. It
  provides both a custom API and integration with the RT-Thread sensor device framework
  for measuring particulate matter concentration via ADC and GPIO.
slug: gp2y10-dust-sensor-driver-for-rt-thread
codeUrl: https://github.com/luhuadong/rtt-gp2y10
siteUrl: https://github.com/luhuadong/rtt-gp2y10
star: 1
version: v1.0.0
lastUpdated: '2020-10-06'
rtos: rt-thread
topics:
- mcu
- rt-thread
- rt-thread-rtos
- sensor
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- pmsxx-sensor-driver-for-rt-thread
- sgp30-gas-sensor-driver-for-rt-thread
- ccs811-digital-gas-sensor-driver-for-rt-thread
- bme680-sensor-package-for-rt-thread
- dhtxx-sensor-driver-for-rt-thread
- hdc1000-sensor-driver-for-rt-thread
---

The rtt-gp2y10 package provides a comprehensive driver solution for the Sharp GP2Y10 series of optical dust sensors, specifically the GP2Y1010AU0F and GP2Y1014AU0F models. These sensors are widely used in air quality monitoring systems to detect particulate matter concentration. This driver is built for the RT-Thread ecosystem, offering seamless integration with the RT-Thread sensor device framework while maintaining a flexible standalone API.

## Key Features

The driver is designed with embedded best practices in mind, ensuring it is suitable for production-grade firmware. Key capabilities include:
- **Multi-instance Support**: Manage multiple GP2Y10 sensors on a single system.
- **Flexible Memory Management**: Supports both static and dynamic memory allocation to suit different system constraints.
- **Thread Safety**: Safe for use in multi-threaded RTOS environments.
- **Sensor Framework Integration**: Fully compatible with the RT-Thread sensor device driver framework (open/read/control/close).
- **Dual Interface**: Provides both a simplified custom API and a standardized RT-Thread device interface.

## Technical Implementation

The GP2Y10 sensor operates on an optical detection principle. It requires an ADC (Analog-to-Digital Converter) to read the output voltage (AOUT) and a GPIO pin (ILED) to trigger the internal infrared LED pulse. The driver handles the timing requirements for the pulse and the subsequent ADC sampling to calculate the dust density in ug/m3.

### Hardware Requirements
- **ADC**: Used for reading the analog output from the sensor.
- **GPIO**: Used to control the ILED pin for pulse emission.
- **RT-Thread 4.0+**: The package is optimized for modern versions of the RT-Thread RTOS.

## Usage and Integration

Developers can choose between two primary ways to interact with the sensor. For those wanting a quick, direct implementation, the custom API allows for manual object creation and data retrieval.

```c
gp2y10_device_t gp2y10_create(const rt_base_t iled_pin, const rt_base_t aout_pin);
rt_uint32_t gp2y10_get_dust_density(gp2y10_device_t dev);
```

Alternatively, for better system-wide abstraction, the driver can be registered as a standard RT-Thread sensor device. This allows the sensor to be accessed using the standard `rt_device_find` and `rt_device_read` calls, making it interchangeable with other sensor types in the system.

```c
static int rt_hw_gp2y10_port(void)
{
    struct gp2y10_device gp2y10_dev;
    struct rt_sensor_config cfg;

    gp2y10_dev.iled_pin = GP2Y10_ILED_PIN;
    gp2y10_dev.aout_pin = GP2Y10_AOUT_PIN;

    cfg.intf.user_data = (void *)&gp2y10_dev;
    rt_hw_gp2y10_init("gp2", &cfg);

    return RT_EOK;
}
INIT_COMPONENT_EXPORT(rt_hw_gp2y10_port);
```

## Configuration Options

The package is highly configurable via the RT-Thread Env tool or Kconfig. Users can specify the ADC device name, the specific ADC channel, the resolution (bits), and the voltage ratio of the GP2Y10 module's voltage divider circuit. This ensures the driver can be tuned to the specific hardware characteristics of the target board.
