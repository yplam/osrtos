---
title: DHTxx Sensor Driver for RT-Thread
summary: A comprehensive driver package for RT-Thread that supports the DHTxx series
  of single-bus digital humidity and temperature sensors, including DHT11, DHT12,
  DHT21, and DHT22. It offers both a standalone custom API and seamless integration
  with the RT-Thread sensor device framework for flexible embedded development.
slug: dhtxx-sensor-driver-for-rt-thread
codeUrl: https://github.com/luhuadong/rtt-dhtxx
star: 4
version: v0.9.0
lastUpdated: '2025-03-20'
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
- hdc1000-sensor-driver-for-rt-thread
- bme680-sensor-package-for-rt-thread
- ccs811-digital-gas-sensor-driver-for-rt-thread
- tmp1075-temperature-sensor-driver-for-rt-thread
- sgp30-gas-sensor-driver-for-rt-thread
---

The `rtt-dhtxx` package is a dedicated driver for the DHTxx series of digital humidity and temperature sensors, designed specifically for the RT-Thread real-time operating system. These sensors, which include popular models like the DHT11, DHT12, DHT21, and DHT22, utilize a single-bus (one-wire) communication protocol to provide environmental data to microcontrollers.

## Key Features and Capabilities

This driver is built with flexibility and robustness in mind. It supports multi-instance operation, allowing developers to connect and manage multiple sensors on different GPIO pins simultaneously. It also provides options for both static and dynamic memory allocation, making it suitable for resource-constrained environments as well as more complex systems.

One of the standout features is its thread safety, ensuring that sensor data can be accessed reliably in a multi-threaded RTOS environment. Furthermore, the package is fully compatible with the RT-Thread sensor device driver framework, which standardizes how sensors are accessed across the ecosystem.

## Dual API Support

The package offers two distinct ways to interact with the sensors:

1. **Custom API**: This is a direct interface for creating sensor objects, reading data, and retrieving values. It is ideal for simple applications or when the full sensor framework is not required.
2. **Sensor Framework Interface**: By registering the sensor within the RT-Thread device framework, users can interact with the DHTxx hardware using standard system calls like `open()`, `read()`, and `control()`.

## Technical Implementation

The driver handles the timing-sensitive single-bus protocol required by DHT sensors. When using the custom API, developers can create a device handle by specifying the data pin. Once created, reading data is a simple call to `dht_read(dev)`. 

It is important to note that the temperature and humidity values returned are ten times the actual value (e.g., a return of 255 represents 25.5°C). This approach maintains precision without requiring floating-point arithmetic in the core driver. The package includes a helper function, `split_int`, to easily format these values for display.

```c
rt_int32_t integer;
rt_int32_t decimal;
rt_int32_t flag = split_int(dht_get_temperature(dev), &integer, &decimal, 10);
rt_kprintf("Temp: %s%d.%d\n", flag > 0 ? "-" : "", integer, decimal);
```

## Integration with RT-Thread

For projects utilizing the RT-Thread sensor framework, initialization is handled via `rt_hw_dht_init`. This registers the DHTxx device into the system's device tree. Because DHT sensors provide both temperature and humidity, the framework registers two separate sensor devices. An internal 1-bit FIFO is used to synchronize data between these two logical devices, ensuring that a single physical bus read updates both values correctly.

```c
static int rt_hw_dht_port(void)
{
    struct rt_sensor_config cfg;
    
    cfg.intf.type = RT_SENSOR_INTF_ONEWIRE;
    cfg.intf.user_data = (void *)DATA_PIN;
    rt_hw_dht_init("dht", &cfg);
    
    return RT_EOK;
}
INIT_COMPONENT_EXPORT(rt_hw_dht_port);
```

## Getting Started

To use the package, it can be selected via the RT-Thread package manager (menuconfig). Users can choose the specific sensor model (DHT11, DHT22, etc.) and enable sample programs like `cat_dhtxx` for quick testing via the MSH (FinSH) command line. The package requires RT-Thread 4.0 or higher and depends on the GPIO pin driver for the target hardware.
