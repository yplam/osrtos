---
title: M5Stack AtomS3 / NanoC6 BTProxy
summary: This project provides an ESPHome configuration to transform M5Stack AtomS3
  Lite or NanoC6 devices into Bluetooth proxies for Home Assistant. It enables centralized
  management and extended range for Bluetooth Low Energy devices by leveraging ESP32-based
  hardware as network gateways.
slug: m5stack-atoms3-nanoc6-btproxy
codeUrl: https://github.com/yoziru/esphome-m5-btproxy
siteUrl: https://yoziru.github.io/esphome-m5-btproxy/
lastUpdated: '2025-08-31'
licenses:
- Apache-2.0
rtos: freertos
libraries:
- nimble
topics:
- bluetooth-proxy
- esphome
- m5stack
- m5stack-atoms3
- m5stack-nanoc6
isShow: false
createdAt: '2026-04-08T23:47:03+00:00'
updatedAt: '2026-04-08T23:47:03+00:00'
---

Home automation enthusiasts often face the challenge of Bluetooth range limitations. While a central Home Assistant server might be tucked away in a server rack or a utility closet, Bluetooth devices like temperature sensors, smart locks, or plant monitors are scattered throughout the home. The `esphome-m5-btproxy` project offers a streamlined solution to this problem by turning compact M5Stack hardware into dedicated Bluetooth proxies.

Specifically designed for the M5Stack AtomS3 Lite and the NanoC6, this project leverages the power of ESPHome to bridge the gap between remote Bluetooth devices and a Home Assistant instance. By deploying these small, unobtrusive devices around a living space, users can create a robust coverage map that ensures every BLE (Bluetooth Low Energy) device stays connected, regardless of its distance from the main controller.

## Hardware Versatility

The project focuses on two modern ESP32 variants. The AtomS3 Lite, based on the ESP32-S3, provides ample processing power and a compact form factor. The NanoC6, utilizing the ESP32-C6, brings support for modern wireless standards, making it an efficient choice for smart home infrastructure. Both devices are small enough to be plugged into any USB port or hidden behind furniture, serving as "invisible" infrastructure that significantly improves the reliability of a smart home mesh.

## Seamless ESPHome Integration

One of the standout features of this repository is its support for the ESPHome package system. Instead of manually copying and pasting large YAML configurations, users can include the proxy functionality directly from the GitHub source. This approach allows for centralized management; when the repository is updated with improvements or bug fixes, devices can stay up to date with minimal manual intervention.

To integrate this into an existing ESPHome dashboard, the following configuration structure is used:

```yaml
substitutions:
  wifi_ssid: !secret wifi_ssid
  wifi_password: !secret wifi_password
  wifi_hotspot_password: !secret wifi_hotspot_password
  ota_password: !secret ota_password
  api_encryption_key: !secret api_encryption_key

packages:
  remote_package_shorthand: github://yoziru/esphome-m5-btproxy/esphome-m5-btproxy-m5stack-atoms3.dashboard.yml@main
```

## Technical Implementation

Under the hood, the project configures the ESP32 to act as a transparent gateway. When Home Assistant needs to communicate with a Bluetooth device, it sends the command over the local network via Wi-Fi to the ESPHome device. The proxy then translates this into a local Bluetooth command. Conversely, any advertisements or data packets received by the proxy from nearby sensors are forwarded back to Home Assistant.

By utilizing the NimBLE stack instead of the default Bluedroid stack, the proxy maintains a significantly lower memory footprint. This is crucial for ESP32-based devices, as it leaves more resources available for maintaining stable Wi-Fi connections and handling the API overhead required by Home Assistant. This setup not only extends range but also offloads the Bluetooth processing from the main Home Assistant host, which is particularly beneficial for users running their automation on hardware with limited or no onboard Bluetooth capabilities.
