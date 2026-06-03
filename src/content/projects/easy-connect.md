---
title: Easy Connect
summary: A helper library for Mbed OS that simplifies network interface initialization
  across Ethernet, WiFi, Mesh, and Cellular technologies. It abstracts hardware-specific
  setup into a single call, allowing developers to switch connectivity methods through
  configuration.
codeUrl: https://github.com/ARMmbed/easy-connect
siteUrl: https://os.mbed.com/docs/v5.10/apis/network-interfaces.html
isShow: false
rtos: mbed-os
libraries: []
topics:
- connectivity
- ethernet
- mbed-os
- mbedos
- mesh-networks
- wifi-configuration
- wrapper-library
star: 14
version: v1.2.17
lastUpdated: '2018-09-19'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- wiznetinterface-library
- mbed-os-client-example
- avnet-wnc14a2a-cellular-driver
- pelion-device-management-client-example-for-mbed-os
- m5-crystal
- blynk-wifinina-wm
---

## Simplifying Connectivity in Mbed OS

In the world of IoT development, switching between different connectivity methods—such as moving from an Ethernet-based development board to a WiFi-enabled production module—often requires significant code changes. **Easy Connect** was developed by the Mbed team to solve this exact problem. It acts as a wrapper library that abstracts the complexity of instantiating network interfaces, allowing developers to use a single API regardless of the underlying hardware.

### How It Works

The core philosophy of Easy Connect is to move connectivity configuration out of the source code and into a configuration file (`mbed_app.json`). By defining the desired connection type in the configuration, the library handles the specific initialization logic for various drivers and hardware stacks. 

Supported connectivity methods include:
- **Ethernet**: Standard wired connections.
- **WiFi**: Support for various modules including ESP32, WizFi310, and X-NUCLEO-IDW01M1.
- **Mesh**: 6LoWPAN ND and Thread support.
- **Cellular**: Support for modules like the WNC14A2A.

### Using Easy Connect

Before its functionality was integrated directly into Mbed OS, using Easy Connect was the standard way to write portable network code. Instead of manually creating an `EthernetInterface` or `WiFiInterface` object, a developer would simply call the `easy_connect()` function.

```cpp
#include "easy-connect.h"

int main() {
    // This single call handles initialization based on mbed_app.json
    NetworkInterface* network = easy_connect(true);
    if (!network) {
        printf("Connect to internet failed...
");
        return 1;
    }

    printf("Connected to the network successfully. IP address: %s
", network->get_ip_address());

    // Your network logic here...
}
```

### Configuration-Driven Development

The library relies heavily on the Mbed configuration system. A typical `mbed_app.json` for a WiFi project using Easy Connect might look like this:

```json
{
    "config": {
        "network-interface": {
            "help": "options are ETHERNET, WIFI, MESH_LOWPAN_ND, MESH_THREAD, CELLULAR",
            "value": "WIFI"
        },
        "wifi-ssid": {
            "value": "\"Your_SSID\""
        },
        "wifi-password": {
            "value": "\"Your_Password\""
        }
    }
}
```

### Deprecation and Modern Mbed OS

It is important to note that as of **Mbed OS 5.10**, this standalone repository has been deprecated. The Mbed team recognized the utility of this pattern and integrated it directly into the core OS. Modern Mbed applications should now use the `NetworkInterface::get_default_instance()` method, which provides the same abstraction benefits natively without requiring an external library.

While this repository is no longer maintained, it remains a significant piece of Mbed history, demonstrating the evolution of network abstraction in embedded systems and providing a clear path for legacy projects to understand how modern Mbed connectivity evolved.
