---
title: Avnet WNC14A2A Cellular Driver
summary: A cellular driver library for the WNC14A2A module designed for the Mbed OS
  ecosystem. It provides a standard network interface implementation and configurable
  debug logging for cellular connectivity in embedded applications.
slug: avnet-wnc14a2a-cellular-driver
codeUrl: https://github.com/Avnet/wnc14a2a-driver
star: 1
lastUpdated: '2018-10-25'
rtos: mbed-os
topics:
- device-driver
- mbed-os
- wnc-m14a2a
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- quectel-gsm-lte-modem-driver
- mbed-cellular-boilerplate
- cicada-iot-communications-module-for-energy-access
- mbed-os-lorawan-tinyshell-application
- kw41z-rf-driver-for-arm-mbed-nanostack
- pelion-device-management-client-example-for-mbed-os
---

## Overview

The Avnet WNC14A2A driver is a specialized library designed to integrate the WNC14A2A cellular module with Mbed OS. It provides the necessary abstraction layer to treat the cellular module as a standard network interface, allowing developers to use familiar Mbed networking APIs for cellular data communication.

## Integration with Mbed OS

This driver is built to work seamlessly within the Mbed OS configuration system. To enable the driver, developers specify the connectivity method in their `mbed_app.json` file. By setting the `network-interface` value to `CELLULAR_WNC14A2A`, the Mbed build system incorporates the driver into the network stack. This abstraction allows for easy switching between different connectivity methods (like WiFi or Ethernet) by simply changing a configuration flag.

## Debugging and Monitoring

One of the key features of the WNC14A2A driver is its comprehensive debugging system. The library provides a bit-field configuration through `wnc_debug_setting` that allows developers to toggle specific categories of diagnostic information. This is particularly useful during the development of IoT applications where cellular connectivity issues can be difficult to trace.

Available debug levels include:
- Basic and comprehensive WNC driver output
- Driver Enter/Exit information for flow tracking
- Event Queue monitoring
- SMS-specific debug information
- Memory array dumps for low-level troubleshooting

## Technical Configuration

Because cellular communication often involves large bursts of data, the driver requires specific adjustments to the underlying hardware interface. The documentation recommends overriding the default Mbed UART serial buffer sizes. Increasing the `drivers.uart-serial-txbuf-size` and `drivers.uart-serial-rxbuf-size` to 4KB (up from the default 256 bytes) ensures that the system can handle the data throughput required by the WNC14A2A module without losing packets.

## Getting Started

To use the library, you must include it in your Mbed project and configure your `mbed_app.json`. A typical configuration looks like this:

```json
{
    "config": {
        "network-interface": {
            "value": "CELLULAR_WNC14A2A"
        },
        "wnc_debug": {
            "value": 0
        },
        "wnc_debug_setting": {
            "value": "4"
        }
    },
    "target_overrides": {
        "*": {
            "drivers.uart-serial-txbuf-size": 4096,
            "drivers.uart-serial-rxbuf-size": 4096
        }
    }
}
```

This setup ensures the driver is active, sets the initial debug level, and configures the UART buffers for optimal performance with the cellular hardware.
